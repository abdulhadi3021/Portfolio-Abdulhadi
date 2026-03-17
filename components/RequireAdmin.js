import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://ehieczmqbhqrtnrtthob.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaWVjem1xYmhxcnRucnR0aG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDY1ODAsImV4cCI6MjA4MDU4MjU4MH0.lf8Q-KouKJ2pxPBTVrIO1V_lezJHL6ZdizQYO6Gdcmc"
);

export default function RequireAdmin({ children }) {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        window.location.href = "/admin/login/"
        return
      }
      // check admin table
      const { data } = await supabase.from('admin_users').select('id').eq('id', user.id).single()
      if (data) setAllowed(true)
      else window.location.href = "/admin/login/"
    })
  }, [])

  return allowed ? children : null
}
