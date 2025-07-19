import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text, url, order, donate } = req.body;

  if (!text || !url || order === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase
    .from('buttons')
    .insert([{ text, url, order, donate: donate || false }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
}

