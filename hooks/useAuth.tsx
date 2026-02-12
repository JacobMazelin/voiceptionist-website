import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    propertyIds: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [propertyIds, setPropertyIds] = useState<string[]>([]);

    // Fetch the properties this user owns
    const fetchUserProperties = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('user_properties')
                .select('property_id')
                .eq('user_id', userId);

            if (!error && data) {
                setPropertyIds(data.map((row) => row.property_id));
            } else {
                console.error('Failed to fetch user properties:', error);
                setPropertyIds([]);
            }
        } catch (err) {
            console.error('Error fetching user properties:', err);
            setPropertyIds([]);
        }
    };

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchUserProperties(session.user.id);
            }
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    await fetchUserProperties(session.user.id);
                } else {
                    setPropertyIds([]);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            return { error: error as Error | null };
        } catch (err) {
            return { error: err as Error };
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signUp({ email, password });
            return { error: error as Error | null };
        } catch (err) {
            return { error: err as Error };
        }
    };

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
        } catch {}
        setPropertyIds([]);
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut, propertyIds }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
