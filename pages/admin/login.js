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
  const [success, setSuccess] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  // Check if the user is already logged in
  useEffect(() => {
    let mounted = true;
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (data.user && mounted) {
        router.replace('/admin/dashboard');
      }
    }
    checkUser();
    return () => { mounted = false; };
  }, [router]);

  // When login succeeds, show popup then redirect
  useEffect(() => {
    if (success && !redirecting) {
      setRedirecting(true);
      const timer = setTimeout(() => {
        router.replace('/admin/dashboard');
      }, 1500); // show popup for 1.5s
      return () => clearTimeout(timer);
    }
  }, [success, redirecting, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setRedirecting(false);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message || 'Login failed');
      setSuccess(false);
    } else {
      setSuccess(true);
    }
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
        />
        {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
        {success && (
          <div className="text-green-600 mb-2 text-center glass-card font-semibold animate-fade-in">
            Login successful! Redirecting...
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-primary btn-3d text-white py-2 rounded hover:bg-primary-dark transition"
          disabled={success}
        >
          {success ? 'Success!' : 'Login'}
        </button>
      </form>
    </div>
  );
}
