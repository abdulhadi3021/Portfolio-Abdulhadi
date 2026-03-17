import RequireAdmin from "../../components/RequireAdmin";
import { useState, useEffect } from "react";
import { getProjects } from "../../lib/getProjects";
import { addProject } from "../../lib/addProject";
import { updateProject } from "../../lib/updateProject";
import { deleteProject } from "../../lib/deleteProject";

function AdminDashboard() {
  const emptyForm = { title: "", description: "", image_url: "", repo_url: "", live_url: "" };
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);

  async function refresh() {
    try {
      setProjects(await getProjects());
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editing) {
        await updateProject(editing, form);
      } else {
        await addProject(form);
      }
      setForm(emptyForm);
      setEditing(null);
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  function beginEdit(p) {
    setForm({ ...p });
    setEditing(p.id);
  }

  async function handleDelete(id) {
    try {
      await deleteProject(id);
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <RequireAdmin>
      <h2>Admin: Projects</h2>
      <form onSubmit={handleSubmit} style={{marginBottom:16, display:'flex', flexDirection:'column', gap:8}}>
        <input required placeholder="Title" value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))} />
        <input placeholder="Description" value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))} />
        <input placeholder="Image URL" value={form.image_url} onChange={e=>setForm(f=>({...f, image_url:e.target.value}))} />
        <input placeholder="Repo URL" value={form.repo_url} onChange={e=>setForm(f=>({...f, repo_url:e.target.value}))} />
        <input placeholder="Live URL" value={form.live_url} onChange={e=>setForm(f=>({...f, live_url:e.target.value}))} />
        <button type="submit">{editing ? "Update" : "Add"} Project</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm(emptyForm) }}>Cancel</button>}
        {error && <div style={{color:'red'}}>{error}</div>}
      </form>
      <ul>
        {projects.map(p => (
          <li key={p.id} style={{display:'flex', alignItems:'center', gap:10}}>
            <b>{p.title}</b>
            <button onClick={() => beginEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </RequireAdmin>
  );
}
export default AdminDashboard;
