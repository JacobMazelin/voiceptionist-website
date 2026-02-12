import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface Property {
    id: string;
    name: string;
    timezone: string;
    applicationUrl: string;
    knowledgeText: string;
    tourInstructions: string;
    unitCount?: number;
    aiActive: boolean;
    contacts: PropertyContactInfo[];
    images: PropertyImage[];
}

export interface PropertyContactInfo {
    id: string;
    role: string;
    name: string;
    email: string;
    phone: string;
}

export interface PropertyImage {
    id: string;
    url: string;
    unitType: string;
    caption: string;
}

export function useProperties() {
    const { propertyIds } = useAuth();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (propertyIds.length === 0) { setLoading(false); return; }

        const fetchProperties = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error: fetchError } = await supabase
                    .from('properties')
                    .select(`
            *,
            property_contacts (*),
            property_images (*)
          `)
                    .in('id', propertyIds);

                if (fetchError) throw fetchError;

                const mapped: Property[] = (data ?? []).map((p: any) => ({
                    id: p.id,
                    name: p.name,
                    timezone: p.timezone || '',
                    applicationUrl: p.application_url || '',
                    knowledgeText: p.knowledge_text || '',
                    tourInstructions: p.tour_instructions || '',
                    aiActive: true,
                    contacts: (p.property_contacts ?? []).map((c: any) => ({
                        id: c.id,
                        role: c.role,
                        name: c.name,
                        email: c.email,
                        phone: c.phone,
                    })),
                    images: (p.property_images ?? []).map((img: any) => ({
                        id: img.id,
                        url: img.image_url || '',
                        unitType: img.unit_type || '',
                        caption: img.caption || '',
                    })),
                }));
                setProperties(mapped);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load properties');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [propertyIds]);

    const addProperty = async (propertyData: {
        name: string;
        timezone: string;
        applicationUrl: string;
        knowledgeText: string;
        tourInstructions: string;
    }) => {
        // Input validation
        const trimmedName = propertyData.name?.trim();
        if (!trimmedName) {
            throw new Error('Property name is required');
        }
        if (trimmedName.length > 200) {
            throw new Error('Property name must be 200 characters or fewer');
        }

        const { data, error } = await supabase
            .from('properties')
            .insert({
                name: trimmedName,
                timezone: propertyData.timezone?.trim() || 'America/New_York',
                application_url: propertyData.applicationUrl?.trim() || '',
                knowledge_text: propertyData.knowledgeText || '',
                tour_instructions: propertyData.tourInstructions || '',
            })
            .select()
            .single();

        if (error) throw error;

        // Also add to user_properties junction
        const { data: { user } } = await supabase.auth.getUser();
        if (user && data) {
            await supabase.from('user_properties').insert({
                user_id: user.id,
                property_id: data.id,
                role: 'owner',
            });
        }

        return data;
    };

    const updateProperty = async (id: string, updates: Partial<Property>) => {
        const { error } = await supabase
            .from('properties')
            .update({
                name: updates.name,
                timezone: updates.timezone,
                application_url: updates.applicationUrl,
                knowledge_text: updates.knowledgeText,
                tour_instructions: updates.tourInstructions,
            })
            .eq('id', id);

        if (error) throw error;
    };

    return { properties, loading, error, addProperty, updateProperty };
}
