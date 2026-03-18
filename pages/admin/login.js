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

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  // 1. If already logged in on mount, redirect to dashboard
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (mounted && data.user) {
        router.replace('/admin/dashboard');
      }
    })();
    return () => { mounted = false; };
  }, [router]);

  // 2. Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('No Pass Admin or Admin Denied');
      setTimeout(() => {
        router.replace('/'); // Redirect to home after 2s
      }, 2000);
    } else {
      setSuccess('Admin login success. Redirecting...');
      setTimeout(() => {
        router.replace('/admin/dashboard');
      }, 1800);
    }
    setSubmitting(false);
  };

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
          autoComplete="username"
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          disabled={submitting}
        />
        <label className="block mb-2 font-medium">Password</label>
        <input
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          disabled={submitting}
        />
        {error && (
          <div className="text-red-600 mb-2 text-center glass-card font-semibold animate-fade-in">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 mb-2 text-center glass-card font-semibold animate-fade-in">
            {success}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-primary btn-3d text-white py-2 rounded hover:bg-primary-dark transition"
          disabled={submitting || !!success}
        >
          {submitting ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
