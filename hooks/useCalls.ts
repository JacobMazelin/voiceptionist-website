import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { useRealtimeSubscription } from './useRealtimeSubscription';

export interface ConversationContact {
    id: string;
    name: string;
    message: string;
    time: string;
    status: 'open' | 'closed' | 'all';
    active?: boolean;
    unread?: boolean;
    phone?: string;
    email?: string;
    channel?: string;
    propertyName?: string;
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'contact' | 'ai' | 'system';
    text: string;
    time: string;
    date: string;
    status?: string;
    isAI?: boolean;
    metadata?: {
        callDuration?: string;
        callCategory?: string;
        isAssignment?: boolean;
    };
}

function formatRelativeTime(dateStr: string): string {
    const now = new Date();
    const d = new Date(dateStr);
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}min`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
}

function formatMessageTime(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatMessageDate(dateStr: string): string {
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) return 'TODAY';
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return 'YESTERDAY';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
}

export function useCalls() {
    const { propertyIds } = useAuth();
    const [contacts, setContacts] = useState<ConversationContact[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch conversations list
    useEffect(() => {
        if (propertyIds.length === 0) {
            setLoading(false);
            return;
        }

        const fetchConversations = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data, error: fetchError } = await supabase
                    .from('conversations')
                    .select(`
            id,
            phone_number,
            channel,
            status,
            updated_at,
            created_at,
            properties:property_id (name)
          `)
                    .in('property_id', propertyIds)
                    .order('updated_at', { ascending: false })
                    .limit(100);

                if (fetchError) throw fetchError;

                const mapped: ConversationContact[] = (data ?? []).map((conv: any) => ({
                    id: conv.id,
                    name: conv.phone_number || 'Unknown',
                    message: '', // Will be filled from last message
                    time: formatRelativeTime(conv.updated_at || conv.created_at),
                    status: conv.status === 'completed' ? 'closed' : 'open',
                    active: conv.status === 'active',
                    phone: conv.phone_number,
                    email: undefined,
                    channel: conv.channel,
                    propertyName: conv.properties?.name,
                }));

                // Fetch last message for each conversation
                if (mapped.length > 0) {
                    const convIds = mapped.map(c => c.id);
                    const { data: lastMessages } = await supabase
                        .from('messages')
                        .select('conversation_id, content')
                        .in('conversation_id', convIds)
                        .order('sent_at', { ascending: false });

                    // Group by conversation, take first (most recent)
                    const lastMsgMap = new Map<string, string>();
                    (lastMessages ?? []).forEach(msg => {
                        if (!lastMsgMap.has(msg.conversation_id)) {
                            lastMsgMap.set(msg.conversation_id, msg.content || '');
                        }
                    });

                    mapped.forEach(contact => {
                        contact.message = lastMsgMap.get(contact.id) || 'No messages yet';
                    });
                }

                setContacts(mapped);

                // Auto-select first conversation
                if (mapped.length > 0 && !selectedContactId) {
                    setSelectedContactId(mapped[0].id);
                }
            } catch (err) {
                console.error('Error fetching conversations:', err);
                setError(err instanceof Error ? err.message : 'Failed to load conversations');
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, [propertyIds]);

    // Realtime: refresh conversations list on new/updated conversations
    useRealtimeSubscription({
        table: 'conversations',
        propertyIds,
        events: ['INSERT', 'UPDATE'],
        onChanged: () => {
            // Re-run the fetch effect by toggling a state
            if (propertyIds.length > 0) {
                const refetch = async () => {
                    try {
                        const { data } = await supabase
                            .from('conversations')
                            .select(`
                    id,
                    phone_number,
                    channel,
                    status,
                    updated_at,
                    created_at,
                    properties:property_id (name)
                  `)
                            .in('property_id', propertyIds)
                            .order('updated_at', { ascending: false })
                            .limit(100);
                        if (data) {
                            const mapped: ConversationContact[] = data.map((conv: any) => ({
                                id: conv.id,
                                name: conv.phone_number || 'Unknown',
                                message: '',
                                time: formatRelativeTime(conv.updated_at || conv.created_at),
                                status: conv.status === 'completed' ? 'closed' : 'open',
                                active: conv.status === 'active',
                                phone: conv.phone_number,
                                email: undefined,
                                channel: conv.channel,
                                propertyName: conv.properties?.name,
                            }));
                            setContacts(mapped);
                        }
                    } catch (err) {
                        console.error('Realtime refetch error:', err);
                    }
                };
                refetch();
            }
        },
    });

    // Realtime: refresh messages when new messages arrive
    // We listen at the property level and refetch the selected conversation
    useRealtimeSubscription({
        table: 'messages',
        propertyIds,
        events: ['INSERT'],
        onChanged: () => {
            if (selectedContactId) {
                fetchMessages(selectedContactId);
            }
        },
    });

    // Fetch messages for selected conversation
    const fetchMessages = useCallback(async (conversationId: string) => {
        setMessagesLoading(true);

        try {
            const { data, error: fetchError } = await supabase
                .from('messages')
                .select('id, role, content, sent_at, metadata_json')
                .eq('conversation_id', conversationId)
                .order('sent_at', { ascending: true });

            if (fetchError) throw fetchError;

            const mapped: ChatMessage[] = (data ?? []).map((msg: any) => {
                let sender: ChatMessage['sender'] = 'contact';
                if (msg.role === 'assistant' || msg.role === 'ai') sender = 'ai';
                else if (msg.role === 'user' || msg.role === 'agent') sender = 'user';
                else if (msg.role === 'system') sender = 'system';

                const meta = msg.metadata_json as any;

                return {
                    id: msg.id,
                    sender,
                    text: msg.content || '',
                    time: formatMessageTime(msg.sent_at),
                    date: formatMessageDate(msg.sent_at),
                    isAI: sender === 'ai',
                    metadata: meta ? {
                        callDuration: meta.call_duration,
                        callCategory: meta.call_category,
                        isAssignment: meta.is_assignment,
                    } : undefined,
                };
            });

            setMessages(mapped);
        } catch (err) {
            console.error('Error fetching messages:', err);
        } finally {
            setMessagesLoading(false);
        }
    }, []);

    // Load messages when selected contact changes
    useEffect(() => {
        if (selectedContactId) {
            fetchMessages(selectedContactId);
        }
    }, [selectedContactId, fetchMessages]);

    const selectContact = (id: string) => {
        setSelectedContactId(id);
    };

    return {
        contacts,
        messages,
        selectedContactId,
        selectContact,
        loading,
        messagesLoading,
        error,
    };
}
