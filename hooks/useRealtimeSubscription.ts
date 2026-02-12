import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type PostgresChangeEvent = 'INSERT' | 'UPDATE' | 'DELETE';

interface UseRealtimeOptions {
    /** Table name to subscribe to */
    table: string;
    /** Only fire callback when change affects one of these property IDs */
    propertyIds: string[];
    /** Which events to listen for (defaults to all three) */
    events?: PostgresChangeEvent[];
    /** Called when a matching change occurs */
    onChanged: (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void;
    /** Disable the subscription (e.g. while still loading auth) */
    enabled?: boolean;
}

/**
 * Generic hook that subscribes to Supabase Realtime changes on a table.
 * 
 * @example
 * ```ts
 * useRealtimeSubscription({
 *   table: 'calls',
 *   propertyIds,
 *   onChanged: () => refetchCalls(),
 * });
 * ```
 */
export function useRealtimeSubscription({
    table,
    propertyIds,
    events = ['INSERT', 'UPDATE', 'DELETE'],
    onChanged,
    enabled = true,
}: UseRealtimeOptions) {
    const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
    const channelRef = useRef<RealtimeChannel | null>(null);
    // Keep a stable reference to the callback to avoid re-subscribing on every render
    const onChangedRef = useRef(onChanged);
    onChangedRef.current = onChanged;

    useEffect(() => {
        // Don't subscribe if disabled or no property IDs
        if (!enabled || propertyIds.length === 0) {
            setStatus('disconnected');
            return;
        }

        // Create a unique channel name
        const channelName = `realtime-${table}-${propertyIds.join('-').slice(0, 32)}`;

        setStatus('connecting');

        const channel = supabase.channel(channelName);

        // Subscribe to each event type
        events.forEach((event) => {
            channel.on(
                'postgres_changes',
                {
                    event,
                    schema: 'public',
                    table,
                    // Filter by property_id so users only get their own data
                    filter: propertyIds.length === 1
                        ? `property_id=eq.${propertyIds[0]}`
                        : undefined, // Supabase filter only supports eq, not in — we filter client-side for multi
                },
                (payload) => {
                    // Client-side filter for multiple property IDs
                    const record = (payload.new || payload.old) as Record<string, unknown> | undefined;
                    if (propertyIds.length > 1 && record?.property_id) {
                        if (!propertyIds.includes(record.property_id as string)) {
                            return; // Not our property, ignore
                        }
                    }
                    onChangedRef.current(payload);
                }
            );
        });

        channel.subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                setStatus('connected');
            } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
                setStatus('disconnected');
            }
        });

        channelRef.current = channel;

        // Cleanup on unmount or dependency change
        return () => {
            if (channelRef.current) {
                supabase.removeChannel(channelRef.current);
                channelRef.current = null;
            }
            setStatus('disconnected');
        };
    }, [table, propertyIds.join(','), enabled, events.join(',')]);

    return { status };
}
