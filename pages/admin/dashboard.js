import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { getProjects } from '@/lib/getProjects';
import { addProject } from '@/lib/addProject';
import { updateProject } from '@/lib/updateProject';
import { deleteProject } from '@/lib/deleteProject';

export default function AdminDashboard() {
  const [user, setUser] = useState(undefined);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', url: '', id: null });
  const [popup, setPopup] = useState('');
  const router = useRouter();

  // Auth check
  useEffect(() => {
    let mounted = true;
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      if (mounted) setUser(data.user ?? null);
    }
    checkAuth();
    const { data: listener } = supabase.auth.onAuthStateChange(() => checkAuth());
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);
  useEffect(() => {
    if (user === null) router.replace('/admin/login');
    if (user) loadProjects();
    // eslint-disable-next-line
  }, [user]);

  // Load projects
  const loadProjects = async () => {
    setLoading(true);
    try {
      setProjects(await getProjects());
    } catch (e) {
      setPopup('Failed to load projects!');
    }
    setLoading(false);
  };

  // Add or Edit project
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateProject(form.id, {
          title: form.title, description: form.description, url: form.url
        });
        setPopup('Project updated!');
      } else {
        await addProject({
          title: form.title, description: form.description, url: form.url
        });
        setPopup('Project added!');
      }
      setForm({ title: '', description: '', url: '', id: null });
      loadProjects();
    } catch (e) {
      setPopup(`Error: ${e.message}`);
    }
  };

  // Delete project
  const handleDelete = async id => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteProject(id);
      setPopup('Project deleted!');
      loadProjects();
    } catch (e) {
      setPopup(`Delete err: ${e.message}`);
    }
  };

  // Edit project (populate form)
  const handleEdit = p => setForm({ ...p });

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  if (user === undefined) return null; // don't render if loading!

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg glass-card rounded-lg p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-primary gradient-text">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn-3d bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400">Logout</button>
        </div>
        {/* Popup */}
        {popup && <div className="mb-4 text-center font-bold text-green-600">{popup}</div>}

        {/* Add/Edit Project Form */}
        <form onSubmit={handleSubmit} className="mb-8 space-y-2">
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
              <button className="btn-3d bg-gray-300 text-black px-4 py-2 rounded" onClick={() => setForm({title:'',description:'',url:'',id:null})} type="button">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Project List */}
        <h2 className="text-xl font-semibold mb-2">All Projects</h2>
        {loading ? (
          <div>Loading projects...</div>
        ) : projects.length === 0 ? (
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
                  <button onClick={()=>handleEdit(p)} className="btn-3d bg-yellow-400 px-2 py-1 rounded">Edit</button>
                  <button onClick={()=>handleDelete(p.id)} className="btn-3d bg-red-500 px-2 py-1 rounded text-white">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
