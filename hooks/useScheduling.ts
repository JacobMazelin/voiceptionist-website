import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { useRealtimeSubscription } from './useRealtimeSubscription';

export interface Tour {
    id: string;
    leadName: string;
    date: string;
    time: string;
    unitType: string;
    propertyName: string;
    status: string;
    phone: string;
    notes: string;
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatTime(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function useScheduling() {
    const { propertyIds } = useAuth();
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTours = useCallback(async (silent = false) => {
        if (propertyIds.length === 0) { setLoading(false); return; }
        if (!silent) setLoading(true);
        setError(null);
        try {
            const { data, error: fetchError } = await supabase
                .from('tours')
                .select(`
            id, 
            booked_time,
            status,
            leads:lead_id (name, phone, preferences_json),
            properties:property_id (name)
          `)
                .in('property_id', propertyIds)
                .order('booked_time', { ascending: true });

            if (fetchError) throw fetchError;

            const mapped: Tour[] = (data ?? []).map((tour: any) => {
                const prefs = tour.leads?.preferences_json || {};
                return {
                    id: tour.id,
                    leadName: tour.leads?.name || 'Unknown',
                    date: formatDate(tour.booked_time || tour.requested_time),
                    time: formatTime(tour.booked_time || tour.requested_time),
                    unitType: prefs.unit_type || '',
                    propertyName: tour.properties?.name || '',
                    status: tour.status || 'REQUESTED',
                    phone: tour.leads?.phone || '',
                    notes: '',
                };
            });
            setTours(mapped);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load tours');
        } finally {
            setLoading(false);
        }
    }, [propertyIds]);

    useEffect(() => {
        fetchTours();
    }, [fetchTours]);

    useRealtimeSubscription({
        table: 'tours',
        propertyIds,
        events: ['INSERT', 'UPDATE'],
        onChanged: () => fetchTours(true),
    });

    return { tours, loading, error };
}
