import { createClient } from './client';

export interface WheelData {
    id?: string;
    title: string;
    segments: Array<{ text: string; color: string }>;
    slug: string;
    views?: number;
    created_at?: string;
}

/**
 * Increment view count for a wheel
 */
export async function incrementWheelViews(slug: string): Promise<void> {
    const supabase = createClient();

    try {
        await supabase.rpc('increment_wheel_views', { wheel_slug: slug });
    } catch (error) {
        console.error('Error incrementing views:', error);
    }
}

/**
 * Fetch wheel by slug
 */
export async function getWheelBySlug(slug: string): Promise<WheelData | null> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('wheels')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching wheel:', error);
        return null;
    }

    return data;
}

/**
 * Create a new wheel
 */
export async function createWheel(wheelData: Omit<WheelData, 'id' | 'views' | 'created_at'>): Promise<WheelData | null> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('wheels')
        .insert(wheelData)
        .select()
        .single();

    if (error) {
        console.error('Error creating wheel:', error);
        return null;
    }

    return data;
}
