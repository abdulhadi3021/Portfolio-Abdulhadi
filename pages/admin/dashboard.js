import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ehieczmqbhqrtnrtthob.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaWVjem1xYmhxcnRucnR0aG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDY1ODAsImV4cCI6MjA4MDU4MjU4MH0.lf8Q-KouKJ2pxPBTVrIO1V_lezJHL6ZdizQYO6Gdcmc'
);

export default function Dashboard() {
  const [status, setStatus] = useState('loading'); // 'loading', 'authenticated', 'unauthenticated'
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: '', description: '', url: '', repo_url: '', tags: '', image_url: '', published: true, id: null
  });
  const [msg, setMsg] = useState('');
  const [imgUploading, setImgUploading] = useState(false);
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    let mounted = true;
    async function check() {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      if (data.user) {
        setStatus('authenticated');
        loadProjects();
      } else {
        setStatus('unauthenticated');
        setTimeout(() => router.replace('/admin/login'), 500);
      }
    }
    check();
    return () => { mounted = false; };
  }, [router]);

  // Load projects (fetch from Supabase)
  const loadProjects = async () => {
    setMsg('');
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) setMsg('Could not fetch projects');
    else setProjects(data || []);
  };

  // For uploading to Supabase Storage (optional, for image upload)
  // Edit this function if you want to enable real image uploads
  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgUploading(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `project-images/${Date.now()}-${Math.random()}.${fileExt}`;
    let { error } = await supabase.storage.from('project-images').upload(filePath, file);
    if (error) {
      setMsg('Image upload failed.');
    } else {
      const { data } = supabase.storage.from('project-images').getPublicUrl(filePath);
      setForm(f => ({ ...f, image_url: data.publicUrl }));
      setMsg('Image uploaded!');
    }
    setImgUploading(false);
  };

  // Add or Edit project
  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    let tagArray = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (!form.title) return setMsg('Title required');
    if (form.id) {
      // Edit existing
      const { error } = await supabase.from('projects').update({
        title: form.title,
        description: form.description,
        url: form.url,
        repo_url: form.repo_url,
        tags: tagArray,
        image_url: form.image_url,
        published: form.published,
      }).eq('id', form.id);
      if (error) setMsg('Failed to update.');
      else setMsg('Project updated!');
    } else {
      // Add new
      const { error } = await supabase.from('projects').insert([{
        title: form.title,
        description: form.description,
        url: form.url,
        repo_url: form.repo_url,
        tags: tagArray,
        image_url: form.image_url,
        published: form.published,
      }]);
      if (error) setMsg('Failed to add.');
      else setMsg('Project added!');
    }
    setForm({ title: '', description: '', url: '', repo_url: '', tags: '', image_url: '', published: true, id: null });
    loadProjects();
  };

  // Start editing
  const handleEdit = (p) =>
    setForm({
      title: p.title || '',
      description: p.description || '',
      url: p.url || '',
      repo_url: p.repo_url || '',
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags || '',
      image_url: p.image_url || '',
      published: p.published ?? true,
      id: p.id,
    });

  // Delete project
  const handleDelete = async id => {
    if (!window.confirm('Delete this project?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) setMsg('Failed to delete.');
    else setMsg('Project deleted!');
    loadProjects();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  if (status === 'loading' || status === 'unauthenticated') return null;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="bg-white glass-card rounded-xl shadow-lg p-8 max-w-2xl mx-auto fade-in">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold mb-2 text-primary gradient-text text-center">
            Admin Dashboard
          </h1>
          <button onClick={handleLogout} className="btn-3d bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400">Logout</button>
        </div>

        {msg && <div className="mb-4 text-center font-bold text-green-600">{msg}</div>}

        {/* Add/Edit Project Form */}
        <form onSubmit={handleSubmit} className="mb-8 space-y-2 glass-card p-5 rounded">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Title"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            required
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Live App URL"
            value={form.url}
            onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Repository URL"
            value={form.repo_url}
            onChange={e => setForm(f => ({ ...f, repo_url: e.target.value }))}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Image URL (or upload below)"
            value={form.image_url}
            onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
          />
          {/* (Optional real image upload, needs storage bucket "project-images" in Supabase) */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImgUpload}
            className="block w-full"
            disabled={imgUploading}
          />
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={form.published}
              onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
              id="published"
            />
            <label htmlFor="published">Published</label>
            {form.image_url && (
              <img src={form.image_url} alt="project" className="h-12 ml-4 rounded shadow" />
            )}
          </div>
          <div>
            <button className="btn-3d bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark mr-2" type="submit">
              {form.id ? 'Update Project' : 'Add Project'}
            </button>
            {form.id && (
              <button
                className="btn-3d bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setForm({
                  title: '', description: '', url: '', repo_url: '', tags: '', image_url: '', published: true, id: null
                })}
                type="button"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <h2 className="text-xl font-semibold mb-2">All Projects</h2>
        {projects.length === 0 ? (
          <div>No projects yet.</div>
        ) : (
          <ul className="space-y-3">
            {projects.map(p => (
              <li key={p.id} className="border rounded p-3 flex justify-between items-center bg-gray-100">
                <div>
                  <div className="font-bold">{p.title} {p.published === false && <span className="text-xs text-gray-500">(Unpublished)</span>}</div>
                  <div className="text-gray-600 text-sm">{p.description}</div>
                  {p.url && <a href={p.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Live App</a>}<br/>
                  {p.repo_url && <a href={p.repo_url} className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Repo</a>}
                  {Array.isArray(p.tags) && p.tags.length > 0 && (
                    <div className="text-xs text-gray-500 mt-1">Tags: {p.tags.join(', ')}</div>
                  )}
                  {p.image_url && <img src={p.image_url} alt="" className="h-12 mt-1 rounded shadow" />}
                </div>
                <div className="flex gap-2 flex-col">
                  <button
                    onClick={() => handleEdit(p)}
                    className="btn-3d bg-yellow-400 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn-3d bg-red-500 px-2 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
