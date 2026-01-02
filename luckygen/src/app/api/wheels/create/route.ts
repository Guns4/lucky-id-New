import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import { generateUniqueSlug } from '@/lib/utils/slugGenerator';

export async function POST(request: NextRequest) {
    try {
        const { title, segments } = await request.json();

        if (!title || !segments || segments.length < 2) {
            return NextResponse.json(
                { error: 'Title and at least 2 segments are required' },
                { status: 400 }
            );
        }

        const supabase = createClient();
        const slug = await generateUniqueSlug(title);

        const { data, error } = await supabase
            .from('wheels')
            .insert({
                title,
                segments,
                slug,
            })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ slug: data.slug, id: data.id });
    } catch (error) {
        console.error('Error creating wheel:', error);
        return NextResponse.json(
            { error: 'Failed to create wheel' },
            { status: 500 }
        );
    }
}
