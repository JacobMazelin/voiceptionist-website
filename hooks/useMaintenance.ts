import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { useRealtimeSubscription } from './useRealtimeSubscription';
import { MaintenanceTicket, EmergencyLevel } from '../types';

function mapSeverity(severity: string | null): EmergencyLevel {
    switch (severity) {
        case 'Emergency': return EmergencyLevel.EMERGENCY;
        case 'Urgent': return EmergencyLevel.URGENT;
        default: return EmergencyLevel.NON_URGENT;
    }
}

function formatTimestamp(dateStr: string): string {
    const now = new Date();
    const d = new Date(dateStr);
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins} MIN AGO`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} HOUR${diffHours > 1 ? 'S' : ''} AGO`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} DAY${diffDays > 1 ? 'S' : ''} AGO`;
}

export function useMaintenance() {
    const { propertyIds } = useAuth();
    const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTickets = useCallback(async (silent = false) => {
        if (propertyIds.length === 0) { setLoading(false); return; }
        if (!silent) setLoading(true);
        setError(null);
        try {
            const { data, error: fetchError } = await supabase
                .from('maintenance_tickets')
                .select('id, ticket_number, tenant_name, unit, issue, severity, status, created_at')
                .in('property_id', propertyIds)
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;

            const mapped: MaintenanceTicket[] = (data ?? []).map((ticket: any) => ({
                id: ticket.ticket_number || ticket.id,
                tenantName: ticket.tenant_name,
                unit: ticket.unit,
                issue: ticket.issue,
                severity: mapSeverity(ticket.severity),
                status: ticket.status || 'Open',
                timestamp: formatTimestamp(ticket.created_at),
            }));
            setTickets(mapped);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load maintenance tickets');
        } finally {
            setLoading(false);
        }
    }, [propertyIds]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    useRealtimeSubscription({
        table: 'maintenance_tickets',
        propertyIds,
        events: ['INSERT', 'UPDATE'],
        onChanged: () => fetchTickets(true),
    });

    return { tickets, loading, error };
}
