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
  const [form, setForm] = useState({ title: '', description: '', url: '', id: null });
  const [msg, setMsg] = useState('');
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

  // Add or Edit project
  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    if (!form.title) return setMsg('Title required');
    if (form.id) {
      // Edit existing
      const { error } = await supabase.from('projects').update({
        title: form.title, description: form.description, url: form.url
      }).eq('id', form.id);
      if (error) setMsg('Failed to update.');
      else setMsg('Project updated!');
    } else {
      // Add new
      const { error } = await supabase.from('projects').insert([{
        title: form.title, description: form.description, url: form.url
      }]);
      if (error) setMsg('Failed to add.');
      else setMsg('Project added!');
    }
    setForm({ title: '', description: '', url: '', id: null });
    loadProjects();
  };

  // Start editing: fill form with project data
  const handleEdit = p => setForm({ ...p });

  // Delete project
  const handleDelete = async id => {
    if (!window.confirm('Delete this project?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) setMsg('Failed to delete.');
    else setMsg('Project deleted!');
    loadProjects();
  };

  // Log out
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

        {/* Message popup */}
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
            placeholder="Project URL"
            value={form.url}
            onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
          />
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Description"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
          <div>
            <button className="btn-3d bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark mr-2" type="submit">
              {form.id ? 'Update Project' : 'Add Project'}
            </button>
            {form.id && (
              <button
                className="btn-3d bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setForm({ title: '', description: '', url: '', id: null })}
                type="button"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Project List */}
        <h2 className="text-xl font-semibold mb-2">All Projects</h2>
        {projects.length === 0 ? (
          <div>No projects yet.</div>
        ) : (
          <ul className="space-y-3">
            {projects.map(p => (
              <li key={p.id} className="border rounded p-3 flex justify-between items-center bg-gray-100">
                <div>
                  <div className="font-bold">{p.title}</div>
                  <div className="text-gray-600 text-sm">{p.description}</div>
                  <a href={p.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{p.url}</a>
                </div>
                <div className="flex gap-2">
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
