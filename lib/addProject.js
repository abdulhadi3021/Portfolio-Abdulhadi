import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ehieczmqbhqrtnrtthob.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaWVjem1xYmhxcnRucnR0aG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDY1ODAsImV4cCI6MjA4MDU4MjU4MH0.lf8Q-KouKJ2pxPBTVrIO1V_lezJHL6ZdizQYO6Gdcmc'
);

export async function addProject(project) {
  const { data, error } = await supabase.from('projects').insert([project]);
  if (error) throw error;
  return data;
}
