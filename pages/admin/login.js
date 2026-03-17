import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://ehieczmqbhqrtnrtthob.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaWVjem1xYmhxcnRucnR0aG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDY1ODAsImV4cCI6MjA4MDU4MjU4MH0.lf8Q-KouKJ2pxPBTVrIO1V_lezJHL6ZdizQYO6Gdcmc"
);

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleLogin(e) {
    e.preventDefault()
    setError("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else window.location.href = "/admin/dashboard"
  }

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={e=>setEmail(e.target.value)} type='email' required placeholder='Email' />
      <input value={password} onChange={e=>setPassword(e.target.value)} type='password' required placeholder='Password' />
      <button type='submit'>Login</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}
