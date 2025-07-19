import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== 'PUT' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, text, url, order, donate } = req.body;

  if (!id || !text || !url || order === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase
    .from('buttons')
    .update({ text, url, order, donate: donate || false })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
}

