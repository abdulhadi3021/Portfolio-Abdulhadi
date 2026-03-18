import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
// import { useAuthUser } from '@/lib/useAuthUser'; // if using the custom hook

const supabase = createClient(
  'https://ehieczmqbhqrtnrtthob.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaWVjem1xYmhxcnRucnR0aG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDY1ODAsImV4cCI6MjA4MDU4MjU4MH0.lf8Q-KouKJ2pxPBTVrIO1V_lezJHL6ZdizQYO6Gdcmc'
);

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined); // undefined: loading, null: not logged in, object: logged in
  const router = useRouter();

  // Effect: Check auth state (run on load and when login/logout happens)
  useEffect(() => {
    let mounted = true;
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (mounted) setUser(data.user ?? null);
      setLoading(false);
    }
    checkUser();
    // Listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => checkUser());
    return () => { mounted = false; listener.subscription.unsubscribe(); }
  }, []);

  useEffect(() => {
    // redirect if logged in (do not redirect while page is still loading)
    if (!loading && user) {
      router.replace('/admin/dashboard');
    }
  }, [user, loading, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message || 'Login failed');
    else setSuccess(true);
    // The auth listener will update user state and cause redirect
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
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
        {success && <div className="text-green-600 mb-2 text-center">Login successful! Redirecting…</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
