import { createClient } from '../supabase/client';

export async function generateUniqueSlug(title: string): Promise<string> {
    // Create base slug from title
    let slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Remove duplicate hyphens

    // Limit length
    slug = slug.substring(0, 50);

    // Fallback if slug is empty
    if (!slug || slug === '') {
        slug = 'wheel';
    }

    // Check uniqueness
    const supabase = createClient();
    let uniqueSlug = slug;
    let counter = 1;

    while (true) {
        const { data } = await supabase
            .from('wheels')
            .select('slug')
            .eq('slug', uniqueSlug)
            .single();

        if (!data) {
            // Slug is unique
            return uniqueSlug;
        }

        // Append counter if duplicate
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }
}
