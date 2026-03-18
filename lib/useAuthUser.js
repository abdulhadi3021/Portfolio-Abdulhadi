import { useState, useEffect } from 'react';
// Accept your Supabase client as an argument (or import/create as you do)

export function useAuthUser(supabase) {
  const [user, setUser] = useState(undefined); // undefined = loading, null = anon, obj = logged in

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
    };
    getUser();

    // Listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(() => getUser());
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  return user;
}
