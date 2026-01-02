'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Trash2, Edit, Plus, Upload, Save, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Theme {
    id: string;
    name: string;
    key: string;
    bg_image_url: string | null;
    pointer_image_url: string | null;
    colors: string[];
    button_style: string | null;
    is_active: boolean;
}

export default function AdminThemesPage() {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingTheme, setEditingTheme] = useState<Partial<Theme> | null>(null);
    const [bgFile, setBgFile] = useState<File | null>(null);
    const [pointerFile, setPointerFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        fetchThemes();
    }, []);

    const fetchThemes = async () => {
        const { data, error } = await supabase
            .from('app_themes')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setThemes(data);
        setLoading(false);
    };

    const handleUpload = async (file: File, path: string) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${path}/${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error } = await supabase.storage
            .from('theme-assets')
            .upload(fileName, file);

        if (error) throw error;

        const { data } = supabase.storage
            .from('theme-assets')
            .getPublicUrl(fileName);

        return data.publicUrl;
    };

    const handleSave = async () => {
        if (!editingTheme?.name || !editingTheme.key) return alert('Name and Key are required');

        setUploading(true);
        try {
            let bgUrl = editingTheme.bg_image_url;
            let pointerUrl = editingTheme.pointer_image_url;

            if (bgFile) {
                bgUrl = await handleUpload(bgFile, 'backgrounds');
            }

            if (pointerFile) {
                pointerUrl = await handleUpload(pointerFile, 'pointers');
            }

            const themeData = {
                name: editingTheme.name,
                key: editingTheme.key,
                bg_image_url: bgUrl,
                pointer_image_url: pointerUrl,
                colors: editingTheme.colors || [],
                button_style: editingTheme.button_style,
                is_active: editingTheme.is_active ?? true,
            };

            if (editingTheme.id) {
                // Update
                const { error } = await supabase
                    .from('app_themes')
                    .update(themeData)
                    .eq('id', editingTheme.id);
                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from('app_themes')
                    .insert(themeData);
                if (error) throw error;
            }

            setEditingTheme(null);
            setBgFile(null);
            setPointerFile(null);
            fetchThemes();
        } catch (error: any) {
            alert('Error saving theme: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        const { error } = await supabase.from('app_themes').delete().eq('id', id);
        if (!error) fetchThemes();
    };

    if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin inline" /> Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Theme Management</h1>
                    <button
                        onClick={() => setEditingTheme({ colors: ['#FF0000', '#00FF00', '#0000FF'] })}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
                    >
                        <Plus size={20} /> Add New Theme
                    </button>
                </div>

                {/* Theme List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {themes.map(theme => (
                        <div key={theme.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                            <div className="h-32 bg-gray-100 relative">
                                {theme.bg_image_url ? (
                                    <img src={theme.bg_image_url} alt={theme.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">No BG Image</div>
                                )}
                                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold">
                                    {theme.key}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2">{theme.name}</h3>
                                <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
                                    {theme.colors.map((c, i) => (
                                        <div key={i} className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: c }} />
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <span className={`px-2 py-1 rounded text-xs ${theme.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {theme.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditingTheme(theme)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(theme.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Edit Modal */}
                {editingTheme && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">{editingTheme.id ? 'Edit Theme' : 'New Theme'}</h2>
                                <button onClick={() => setEditingTheme(null)}><X size={24} /></button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Theme Name</label>
                                        <input
                                            value={editingTheme.name || ''}
                                            onChange={e => setEditingTheme({ ...editingTheme, name: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-lg"
                                            placeholder="e.g. Cyberpunk"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Unique Key (Slug)</label>
                                        <input
                                            value={editingTheme.key || ''}
                                            onChange={e => setEditingTheme({ ...editingTheme, key: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-lg"
                                            placeholder="e.g. cyberpunk"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Background Image</label>
                                    <div className="flex gap-4 items-center">
                                        {editingTheme.bg_image_url && <img src={editingTheme.bg_image_url} className="w-16 h-16 object-cover rounded" />}
                                        <input type="file" onChange={e => setBgFile(e.target.files?.[0] || null)} className="flex-1" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Pointer Image</label>
                                    <div className="flex gap-4 items-center">
                                        {editingTheme.pointer_image_url && <img src={editingTheme.pointer_image_url} className="w-16 h-16 object-contain rounded bg-gray-100" />}
                                        <input type="file" onChange={e => setPointerFile(e.target.files?.[0] || null)} className="flex-1" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Colors (Comma separated hex codes)</label>
                                    <textarea
                                        value={editingTheme.colors?.join(', ') || ''}
                                        onChange={e => setEditingTheme({ ...editingTheme, colors: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                                        className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Button Tailwind Classes</label>
                                    <input
                                        value={editingTheme.button_style || ''}
                                        onChange={e => setEditingTheme({ ...editingTheme, button_style: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
                                        placeholder="bg-blue-600 hover:bg-blue-700 text-white"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={editingTheme.is_active ?? true}
                                        onChange={e => setEditingTheme({ ...editingTheme, is_active: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                    <label>Active</label>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-3">
                                <button onClick={() => setEditingTheme(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button
                                    onClick={handleSave}
                                    disabled={uploading}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                                >
                                    {uploading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                    Save Theme
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
