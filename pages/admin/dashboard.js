import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ehieczmqbhqrtnrtthob.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaWVjem1xYmhxcnRucnR0aG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDY1ODAsImV4cCI6MjA4MDU4MjU4MH0.lf8Q-KouKJ2pxPBTVrIO1V_lezJHL6ZdizQYO6Gdcmc'
);

export default function Dashboard() {
  const [user, setUser] = useState(undefined); // undefined: loading, null: not signed in, obj: signed in
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      if (mounted) setUser(data.user ?? null);
    }
    checkAuth();
    // Listen for changes (optional)
    const { data: listener } = supabase.auth.onAuthStateChange(() => checkAuth());
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (user === null) {
      router.replace('/admin/login');
    }
  }, [user, router]);

  if (user === undefined) return null; // don't render at all even "Loading..."

  // --- You are authenticated! ---
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4 text-primary">Welcome to the REAL Admin Dashboard!</h1>
      {/* Dashboard content here */}
    </div>
  );
}
