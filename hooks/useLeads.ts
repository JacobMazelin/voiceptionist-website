import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { useRealtimeSubscription } from './useRealtimeSubscription';
import { LeasingLead, LeadScore } from '../types';

function mapScore(score: string | null): LeadScore {
    switch (score?.toLowerCase()) {
        case 'hot': return LeadScore.HOT;
        case 'medium': return LeadScore.MEDIUM;
        case 'low': return LeadScore.LOW;
        default: return LeadScore.NOT_A_FIT;
    }
}

function formatRelativeTime(dateStr: string | null): string {
    if (!dateStr) return 'N/A';
    const now = new Date();
    const d = new Date(dateStr);
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins} minutes ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
}

export function useLeads() {
    const { propertyIds } = useAuth();
    const [leads, setLeads] = useState<LeasingLead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLeads = useCallback(async (silent = false) => {
        if (propertyIds.length === 0) { setLoading(false); return; }
        if (!silent) setLoading(true);
        setError(null);
        try {
            const { data, error: fetchError } = await supabase
                .from('leads')
                .select('id, name, email, phone, move_in_date, budget, preferences_json, status, created_at')
                .in('property_id', propertyIds)
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;

            const mapped: LeasingLead[] = (data ?? []).map((lead: any) => {
                const prefs = lead.preferences_json || {};
                return {
                    id: lead.id,
                    name: lead.name || 'Unknown',
                    email: lead.email || '',
                    phone: lead.phone || '',
                    moveInDate: lead.move_in_date || '',
                    budget: lead.budget || 'N/A',
                    unitType: prefs.unit_type || '',
                    pets: prefs.pets ?? false,
                    score: mapScore(prefs.score),
                    lastContacted: formatRelativeTime(lead.created_at),
                };
            });
            setLeads(mapped);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load leads');
        } finally {
            setLoading(false);
        }
    }, [propertyIds]);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    useRealtimeSubscription({
        table: 'leads',
        propertyIds,
        events: ['INSERT', 'UPDATE'],
        onChanged: () => fetchLeads(true),
    });

    return { leads, loading, error };
}
