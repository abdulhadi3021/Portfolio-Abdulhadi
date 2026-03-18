import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ehieczmqbhqrtnrtthob.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaWVjem1xYmhxcnRucnR0aG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDY1ODAsImV4cCI6MjA4MDU4MjU4MH0.lf8Q-KouKJ2pxPBTVrIO1V_lezJHL6ZdizQYO6Gdcmc'
);

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('loading'); // 'loading', 'logged_in', 'logged_out', 'error', 'success'
  const [msg, setMsg] = useState('');
  const router = useRouter();

  // 1. On mount, check for already-logged-in user, but wait for state to settle
  useEffect(() => {
    let mounted = true;
    async function check() {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      if (data.user) {
        setStatus('logged_in');
        setTimeout(() => router.replace('/admin/dashboard'), 500);
      } else {
        setStatus('logged_out');
      }
    }
    check();
    return () => { mounted = false; };
  }, [router]);

  // 2. Handle login, only if not yet logged in
  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');
    setStatus('loading');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus('error');
      setMsg('No Pass Admin or Admin Denied');
      setTimeout(() => router.replace('/'), 2000);
    } else {
      setStatus('success');
      setMsg('Admin login success. Redirecting...');
      setTimeout(() => router.replace('/admin/dashboard'), 1500);
    }
  };

  if (status === 'loading') return null; // Important: do NOT render anything while checking status

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white glass-card p-8 rounded-lg shadow-lg w-full max-w-sm"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-6 text-center gradient-text">Admin Login</h2>
        <label className="block mb-2 font-medium">Email</label>
        <input
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          disabled={status === 'loading' || status === 'success'}
        />
        <label className="block mb-2 font-medium">Password</label>
        <input
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          disabled={status === 'loading' || status === 'success'}
        />
        {msg && (
          <div className={`mb-2 text-center glass-card font-semibold animate-fade-in ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {msg}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-primary btn-3d text-white py-2 rounded hover:bg-primary-dark transition"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'success' ? 'Success!' : 'Login'}
        </button>
      </form>
    </div>
  );
}
