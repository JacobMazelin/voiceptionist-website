import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { useRealtimeSubscription } from './useRealtimeSubscription';

export interface VendorRow {
    id: string;
    name: string;
    logo: string;
    owner: string;
    ytdSpend: string;
    thirtyDaySpend: string;
    status: string;
    location: string;
    category: string;
    rating: number;
}

export interface RenewalRow {
    id: string;
    vendor: string;
    contact: string;
    category: string;
    total: string;
    termDate: string;
    autoRenew: boolean;
}

export function useVendors() {
    const { propertyIds } = useAuth();
    const [vendors, setVendors] = useState<VendorRow[]>([]);
    const [renewals, setRenewals] = useState<RenewalRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVendors = useCallback(async (silent = false) => {
        if (propertyIds.length === 0) { setLoading(false); return; }
        if (!silent) setLoading(true);
        setError(null);
        try {
            const [vendorsRes, contractsRes] = await Promise.all([
                supabase
                    .from('vendors')
                    .select('id, name, contact_person, category, rating, status, location')
                    .in('property_id', propertyIds)
                    .order('name', { ascending: true }),
                supabase
                    .from('vendor_contracts')
                    .select(`
              id,
              total_value,
              end_date,
              termination_date,
              auto_renewal,
              status,
              vendors:vendor_id (name, contact_person, category)
            `)
                    .in('property_id', propertyIds)
                    .order('end_date', { ascending: true }),
            ]);

            if (vendorsRes.error) throw vendorsRes.error;
            if (contractsRes.error) throw contractsRes.error;

            const mappedVendors: VendorRow[] = (vendorsRes.data ?? []).map((v: any) => ({
                id: v.id,
                name: v.name,
                logo: v.name.charAt(0).toUpperCase(),
                owner: v.contact_person || '',
                ytdSpend: 'N/A', // Would need transaction aggregation
                thirtyDaySpend: 'N/A',
                status: v.status || 'Active',
                location: v.location || '',
                category: v.category || '',
                rating: v.rating || 0,
            }));

            const mappedRenewals: RenewalRow[] = (contractsRes.data ?? []).map((c: any) => ({
                id: c.id,
                vendor: (c.vendors as any)?.name || 'Unknown',
                contact: (c.vendors as any)?.contact_person || '',
                category: (c.vendors as any)?.category || '',
                total: c.total_value ? `$${Number(c.total_value).toLocaleString()}` : 'N/A',
                termDate: c.end_date || '',
                autoRenew: c.auto_renewal ?? false,
            }));

            setVendors(mappedVendors);
            setRenewals(mappedRenewals);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load vendors');
        } finally {
            setLoading(false);
        }
    }, [propertyIds]);

    useEffect(() => {
        fetchVendors();
    }, [fetchVendors]);

    useRealtimeSubscription({
        table: 'vendors',
        propertyIds,
        events: ['INSERT', 'UPDATE', 'DELETE'],
        onChanged: () => fetchVendors(true),
    });
    useRealtimeSubscription({
        table: 'vendor_contracts',
        propertyIds,
        events: ['INSERT', 'UPDATE', 'DELETE'],
        onChanged: () => fetchVendors(true),
    });

    return { vendors, renewals, loading, error };
}
