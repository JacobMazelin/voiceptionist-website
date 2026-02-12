import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { email, password, property_name } = req.body;

  if (!email || !password || !property_name) {
    return res.status(400).json({ error: 'Missing required fields: email, password, property_name' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      if (authError.message.includes('already been registered')) {
        return res.status(409).json({ error: 'An account with this email already exists. Please sign in instead.' });
      }
      return res.status(400).json({ error: authError.message });
    }

    if (!authData.user) {
      return res.status(500).json({ error: 'Failed to create user account' });
    }

    const userId = authData.user.id;

    // 2. Create property
    const { data: propertyData, error: propertyError } = await supabase
      .from('properties')
      .insert({
        name: property_name,
        timezone: 'America/New_York',
      })
      .select('id, name')
      .single();

    if (propertyError) {
      await supabase.auth.admin.deleteUser(userId);
      console.error('Property creation error:', propertyError);
      return res.status(500).json({ error: 'Failed to create property. Please try again.' });
    }

    // 3. Link user to property
    const { error: linkError } = await supabase
      .from('user_properties')
      .insert({
        user_id: userId,
        property_id: propertyData.id,
        role: 'owner',
      });

    if (linkError) {
      await supabase.from('properties').delete().eq('id', propertyData.id);
      await supabase.auth.admin.deleteUser(userId);
      console.error('User-property link error:', linkError);
      return res.status(500).json({ error: 'Failed to link account to property. Please try again.' });
    }

    return res.status(200).json({
      property_id: propertyData.id,
      property_name: propertyData.name,
      user_id: userId,
      phone_number: process.env.VAPI_DISPLAY_PHONE || '(734) 829-4025',
    });
  } catch (err: any) {
    console.error('Provision error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
  }
}
