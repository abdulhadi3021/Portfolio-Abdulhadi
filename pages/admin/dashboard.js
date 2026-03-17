import RequireAdmin from "../../components/RequireAdmin";
import { useState, useEffect } from "react"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "https://ehieczmqbhqrtnrtthob.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaWVjem1xYmhxcnRucnR0aG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDY1ODAsImV4cCI6MjA4MDU4MjU4MH0.lf8Q-KouKJ2pxPBTVrIO1V_lezJHL6ZdizQYO6Gdcmc"
);

function AdminDashboard() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({ title: "", description: "", image_url: "", repo_url: "", live_url: "" })
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    const { data } = await supabase.from('projects').select('*').order('created_at', {ascending:false})
    setProjects(data || [])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (editing) {
      await supabase.from('projects').update(form).eq('id', editing)
    } else {
      await supabase.from('projects').insert([form])
    }
    setForm({ title: "", description: "", image_url: "", repo_url: "", live_url: "" })
    setEditing(null)
    loadProjects()
  }

  async function handleEdit(p) {
    setForm(p)
    setEditing(p.id)
  }

  async function handleDelete(id) {
    await supabase.from('projects').delete().eq('id', id)
    loadProjects()
  }

  return (
    <RequireAdmin>
      <h2>Admin: Projects</h2>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Title" value={form.title} onChange={e=>setForm(f=>({...f, title: e.target.value}))}/>
        <input placeholder="Description" value={form.description} onChange={e=>setForm(f=>({...f, description: e.target.value}))}/>
        <input placeholder="Image URL" value={form.image_url} onChange={e=>setForm(f=>({...f, image_url: e.target.value}))}/>
        <input placeholder="Repo URL" value={form.repo_url} onChange={e=>setForm(f=>({...f, repo_url: e.target.value}))}/>
        <input placeholder="Live URL" value={form.live_url} onChange={e=>setForm(f=>({...f, live_url: e.target.value}))}/>
        <button type="submit">{editing ? "Update" : "Add"} Project</button>
        {editing && <button type="button" onClick={()=>{setEditing(null); setForm({ title: "", description: "", image_url: "", repo_url: "", live_url: "" })}}>Cancel</button>}
      </form>
      <ul>
        {projects.map(p=>(
          <li key={p.id}>
            <b>{p.title}</b>
            <button onClick={()=>handleEdit(p)}>Edit</button>
            <button onClick={()=>handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </RequireAdmin>
  )
}

export default AdminDashboard;
