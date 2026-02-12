import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { useRealtimeSubscription } from './useRealtimeSubscription';
import { CallCategory, CallRecord } from '../types';

/**
 * Maps a DB call row (with conversation data) to the dashboard's CallRecord type.
 * The DB has separate `calls` and `conversations` tables, but the Overview 
 * shows a unified "recent activity" feed. This mapper handles both.
 */
function mapCallOutcomeToCategory(outcome: string | null, summary: string | null): CallCategory {
    if (!outcome && summary) {
        const s = summary.toLowerCase();
        if (s.includes('emergency') || s.includes('burst') || s.includes('gas') || s.includes('elevator')) return CallCategory.EMERGENCY;
        if (s.includes('leak') || s.includes('hvac') || s.includes('repair') || s.includes('maintenance')) return CallCategory.RESIDENT;
        if (s.includes('tour') || s.includes('showing') || s.includes('lead') || s.includes('move-in') || s.includes('budget') || s.includes('unit')) return CallCategory.LEASING;
        if (s.includes('vendor') || s.includes('plumb') || s.includes('invoice')) return CallCategory.VENDOR;
        if (s.includes('hoa') || s.includes('bylaw') || s.includes('pool rules')) return CallCategory.HOA;
        return CallCategory.GENERAL;
    }

    switch (outcome) {
        case 'BOOKED_TOUR':
        case 'CAPTURED_LEAD':
            return CallCategory.LEASING;
        case 'ESCALATED':
            return CallCategory.EMERGENCY;
        default:
            return CallCategory.GENERAL;
    }
}

function formatDuration(startedAt: string | null, endedAt: string | null): string {
    if (!startedAt || !endedAt) return '0:00';
    const seconds = Math.floor((new Date(endedAt).getTime() - new Date(startedAt).getTime()) / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatTimestamp(date: string): string {
    const now = new Date();
    const d = new Date(date);
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
}

export interface OverviewStats {
    totalCalls: number;
    totalCallsChange: string;
    leadsCaptured: number;
    leadsChange: string;
    maintenanceCalls: number;
    maintenanceChange: string;
    showsBooked: number;
    showsChange: string;
}

export interface ChartDataPoint {
    name: string;
    display: string;
    calls: number;
    leads: number;
}

export function useOverview() {
    const { propertyIds } = useAuth();
    const [stats, setStats] = useState<OverviewStats>({
        totalCalls: 0, totalCallsChange: '0%',
        leadsCaptured: 0, leadsChange: '0%',
        maintenanceCalls: 0, maintenanceChange: '0%',
        showsBooked: 0, showsChange: '0%',
    });
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [recentActivity, setRecentActivity] = useState<CallRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOverviewData = useCallback(async (silent = false) => {
        if (propertyIds.length === 0) {
            setLoading(false);
            return;
        }
        if (!silent) setLoading(true);
        setError(null);

        try {
            const now = new Date();
            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

            // Fetch all data in parallel
            const [
                callsRes,
                prevCallsRes,
                leadsRes,
                prevLeadsRes,
                maintenanceRes,
                prevMaintenanceRes,
                toursRes,
                prevToursRes,
                recentCallsRes,
            ] = await Promise.all([
                // Current period counts
                supabase.from('calls').select('id', { count: 'exact', head: true })
                    .in('property_id', propertyIds)
                    .gte('created_at', thirtyDaysAgo.toISOString()),
                // Previous period counts (for change %)
                supabase.from('calls').select('id', { count: 'exact', head: true })
                    .in('property_id', propertyIds)
                    .gte('created_at', sixtyDaysAgo.toISOString())
                    .lt('created_at', thirtyDaysAgo.toISOString()),
                supabase.from('leads').select('id', { count: 'exact', head: true })
                    .in('property_id', propertyIds)
                    .gte('created_at', thirtyDaysAgo.toISOString()),
                supabase.from('leads').select('id', { count: 'exact', head: true })
                    .in('property_id', propertyIds)
                    .gte('created_at', sixtyDaysAgo.toISOString())
                    .lt('created_at', thirtyDaysAgo.toISOString()),
                supabase.from('maintenance_tickets').select('id', { count: 'exact', head: true })
                    .in('property_id', propertyIds)
                    .gte('created_at', thirtyDaysAgo.toISOString()),
                supabase.from('maintenance_tickets').select('id', { count: 'exact', head: true })
                    .in('property_id', propertyIds)
                    .gte('created_at', sixtyDaysAgo.toISOString())
                    .lt('created_at', thirtyDaysAgo.toISOString()),
                supabase.from('tours').select('id', { count: 'exact', head: true })
                    .in('property_id', propertyIds)
                    .gte('created_at', thirtyDaysAgo.toISOString()),
                supabase.from('tours').select('id', { count: 'exact', head: true })
                    .in('property_id', propertyIds)
                    .gte('created_at', sixtyDaysAgo.toISOString())
                    .lt('created_at', thirtyDaysAgo.toISOString()),
                // Recent activity (last 50 calls, ordered by created_at)
                supabase.from('calls')
                    .select('id, property_id, caller_phone, started_at, ended_at, summary, outcome, created_at')
                    .in('property_id', propertyIds)
                    .order('created_at', { ascending: false })
                    .limit(50),
            ]);

            // Calculate percentage changes
            const calcChange = (current: number, previous: number): string => {
                if (previous === 0) return current > 0 ? '+100%' : '0%';
                const pct = ((current - previous) / previous * 100).toFixed(1);
                return `${Number(pct) >= 0 ? '+' : ''}${pct}%`;
            };

            const currentCalls = callsRes.count ?? 0;
            const prevCalls = prevCallsRes.count ?? 0;
            const currentLeads = leadsRes.count ?? 0;
            const prevLeads = prevLeadsRes.count ?? 0;
            const currentMaintenance = maintenanceRes.count ?? 0;
            const prevMaintenance = prevMaintenanceRes.count ?? 0;
            const currentTours = toursRes.count ?? 0;
            const prevTours = prevToursRes.count ?? 0;

            setStats({
                totalCalls: currentCalls,
                totalCallsChange: calcChange(currentCalls, prevCalls),
                leadsCaptured: currentLeads,
                leadsChange: calcChange(currentLeads, prevLeads),
                maintenanceCalls: currentMaintenance,
                maintenanceChange: calcChange(currentMaintenance, prevMaintenance),
                showsBooked: currentTours,
                showsChange: calcChange(currentTours, prevTours),
            });

            // Build chart data: daily call/lead counts for past 30 days
            // Fetch daily breakdowns
            const [dailyCallsRes, dailyLeadsRes] = await Promise.all([
                supabase.from('calls')
                    .select('created_at')
                    .in('property_id', propertyIds)
                    .gte('created_at', thirtyDaysAgo.toISOString())
                    .order('created_at', { ascending: true }),
                supabase.from('leads')
                    .select('created_at')
                    .in('property_id', propertyIds)
                    .gte('created_at', thirtyDaysAgo.toISOString())
                    .order('created_at', { ascending: true }),
            ]);

            // Group by day
            const dayMap = new Map<string, { calls: number; leads: number }>();
            for (let i = 0; i <= 30; i++) {
                const d = new Date(thirtyDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
                const key = d.toISOString().split('T')[0];
                dayMap.set(key, { calls: 0, leads: 0 });
            }

            (dailyCallsRes.data ?? []).forEach((row) => {
                const key = new Date(row.created_at).toISOString().split('T')[0];
                const entry = dayMap.get(key);
                if (entry) entry.calls++;
            });

            (dailyLeadsRes.data ?? []).forEach((row) => {
                const key = new Date(row.created_at).toISOString().split('T')[0];
                const entry = dayMap.get(key);
                if (entry) entry.leads++;
            });

            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const chartPoints: ChartDataPoint[] = [];
            dayMap.forEach((val, key) => {
                const d = new Date(key);
                const dayNum = d.getDate();
                chartPoints.push({
                    name: `${months[d.getMonth()]} ${dayNum}`,
                    display: dayNum === 1 ? months[d.getMonth()] : `${dayNum}`,
                    calls: val.calls,
                    leads: val.leads,
                });
            });
            setChartData(chartPoints);

            // Map recent calls to CallRecord type
            const activity: CallRecord[] = (recentCallsRes.data ?? []).map((call) => ({
                id: call.id,
                callerName: call.caller_phone ?? 'Unknown',
                phoneNumber: call.caller_phone ?? '',
                timestamp: formatTimestamp(call.created_at),
                category: mapCallOutcomeToCategory(call.outcome, call.summary),
                summary: call.summary ?? 'No summary available.',
                duration: formatDuration(call.started_at, call.ended_at),
                status: 'completed' as const,
            }));
            setRecentActivity(activity);

        } catch (err) {
            console.error('Error fetching overview data:', err);
            setError(err instanceof Error ? err.message : 'Failed to load overview data');
        } finally {
            setLoading(false);
        }
    }, [propertyIds]);

    // Initial fetch
    useEffect(() => {
        fetchOverviewData();
    }, [fetchOverviewData]);

    // Realtime: re-fetch when any relevant table changes
    useRealtimeSubscription({
        table: 'calls',
        propertyIds,
        events: ['INSERT'],
        onChanged: () => fetchOverviewData(true),
    });
    useRealtimeSubscription({
        table: 'leads',
        propertyIds,
        events: ['INSERT'],
        onChanged: () => fetchOverviewData(true),
    });
    useRealtimeSubscription({
        table: 'tours',
        propertyIds,
        events: ['INSERT', 'UPDATE'],
        onChanged: () => fetchOverviewData(true),
    });
    useRealtimeSubscription({
        table: 'maintenance_tickets',
        propertyIds,
        events: ['INSERT'],
        onChanged: () => fetchOverviewData(true),
    });

    return { stats, chartData, recentActivity, loading, error };
}
