import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ehieczmqbhqrtnrtthob.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaWVjem1xYmhxcnRucnR0aG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDY1ODAsImV4cCI6MjA4MDU4MjU4MH0.lf8Q-KouKJ2pxPBTVrIO1V_lezJHL6ZdizQYO6Gdcmc'
);

export default function Dashboard() {
  const [status, setStatus] = useState('loading'); // 'loading', 'authenticated', 'unauthenticated'
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    async function check() {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      if (data.user) {
        setStatus('authenticated');
      } else {
        setStatus('unauthenticated');
        setTimeout(() => router.replace('/admin/login'), 500);
      }
    }
    check();
    return () => { mounted = false; };
  }, [router]);

  if (status === 'loading' || status === 'unauthenticated') return null;
  // Do not render any dashboard until sure user is logged in

  return (
    <div className="p-10 flex flex-col items-center min-h-screen bg-gray-50">
      <div className="bg-white glass-card rounded-xl shadow-lg p-8 max-w-xl w-full fade-in">
        <h1 className="text-3xl font-extrabold mb-4 text-primary gradient-text text-center">
          Welcome to the REAL Admin Dashboard!
        </h1>
        <p className="text-lg mb-6 text-gray-800 text-center">
          You are successfully authenticated as an admin.
        </p>
        {/* Place your admin controls, links, stats, etc here */}
        <div className="flex flex-col gap-4 items-center">
          <a href="/" className="btn-3d bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition">
            Go to Portfolio Home
          </a>
        </div>
      </div>
    </div>
  );
}
