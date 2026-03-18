import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ehieczmqbhqrtnrtthob.supabase.co', 'your-key');

export default function AdminDashboard() {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (mounted) setUser(data.user ?? null);
      setLoading(false);
    }
    checkUser();
    const { data: listener } = supabase.auth.onAuthStateChange(() => checkUser());
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    // Only redirect after loaded and if not logged in
    if (!loading && user === null) {
      router.replace('/admin/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // Redirecting

  return (
    <div>
      <h1>Welcome, Admin!</h1>
      {/* Admin content here */}
    </div>
  );
}
