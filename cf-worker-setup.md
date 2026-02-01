# Cloudflare Worker Setup for Notes Sync

## Quick Setup (5 min)

1. Go to https://workers.cloudflare.com
2. Sign up (free)
3. Create new Worker
4. Paste this code:

```javascript
// Notes Sync Worker
let notesData = { notes: [], lastUpdated: null };

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === 'GET') {
      return new Response(JSON.stringify(notesData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'POST') {
      notesData = await request.json();
      return new Response(JSON.stringify({ success: true, data: notesData }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response('Method not allowed', { status: 405 });
  }
};
```

5. Deploy → Get URL like `https://notes-sync.yourname.workers.dev`
6. Update dashboard with that URL

## For now using fallback: download + upload
