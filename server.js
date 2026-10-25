/* ============================================================
   SWAPNONIR — server.js
   Dev server: static files + local form API. No dependencies.
   Standard library only: http, fs, path, url, crypto.
   Run: node server.js  →  http://localhost:3000
   ============================================================ */
const http  = require('http');
const fs    = require('fs');
const path  = require('path');
const url   = require('url');
const crypto = require('crypto');

const ROOT = __dirname;
const HOST = '127.0.0.1';
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt':  'text/plain; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

/* ── helpers ── */
function send(res, status, type, body, req) {
  res.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
  });
  res.end(req && req.method === 'HEAD' ? undefined : body);
}

function sendJSON(res, status, obj, req) {
  send(res, status, 'application/json; charset=utf-8', JSON.stringify(obj), req);
}

function notFound(res, req) {
  fs.readFile(path.join(ROOT, '404.html'), (err, page) => {
    if (err) return send(res, 404, 'text/plain; charset=utf-8', 'Not found', req);
    send(res, 404, 'text/html; charset=utf-8', page, req);
  });
}

/* ── static files ── */
function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel === '/' || rel === '') rel = '/index.html';
  const filePath = path.normalize(path.join(ROOT, rel));
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    return notFound(res, req); // path traversal attempt
  }
  fs.readFile(filePath, (err, data) => {
    if (err) return notFound(res, req);
    const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    send(res, 200, type, data, req);
  });
}

/* ── form API ── */
const BD_PHONE = /^01[3-9]\d{8}$/;
const EMAIL    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkPhone(v, errors) {
  if (!BD_PHONE.test(String(v).trim())) errors.phone = 'সঠিক বাংলাদেশি নম্বর দিন (01X-XXXXXXXX)';
}
function checkTxid(data, errors) {
  // bKash: alphanumeric 8–15 chars; Nagad: digits 8–12 (mirrors main.js client rules)
  const pat = String(data.channel).toLowerCase() === 'nagad' ? /^\d{8,12}$/ : /^[A-Z0-9]{8,15}$/i;
  if (!pat.test(String(data.txid).trim())) errors.txid = 'সঠিক TxID দিন।';
}

const RULES = {
  '/api/donate': {
    required: ['name', 'phone', 'amount', 'channel', 'txid'],
    validate(data, errors) {
      checkPhone(data.phone, errors);
      if (data.channel && !['bkash', 'nagad'].includes(String(data.channel).toLowerCase())) {
        errors.channel = 'bKash বা Nagad বেছে নিন।';
      }
      if (data.txid) checkTxid(data, errors);
    },
  },
  '/api/volunteer': {
    required: ['name', 'phone'],
    validate(data, errors) { checkPhone(data.phone, errors); },
  },
  '/api/contact': {
    required: ['name', 'email', 'message'],
    validate(data, errors) {
      if (!EMAIL.test(String(data.email).trim())) errors.email = 'সঠিক ইমেইল দিন।';
    },
  },
};

function readBody(req, limit = 64 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > limit) { reject(new Error('body too large')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function parseBody(raw, contentType) {
  const ct = (contentType || '').split(';')[0].trim().toLowerCase();
  if (ct === 'application/json') return JSON.parse(raw || '{}');
  if (ct === 'application/x-www-form-urlencoded') return Object.fromEntries(new URLSearchParams(raw));
  return null;
}

function saveSubmission(endpoint, data) {
  const dir  = path.join(ROOT, 'data');
  const file = path.join(dir, 'submissions.json');
  fs.mkdirSync(dir, { recursive: true });
  let list = [];
  try {
    list = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!Array.isArray(list)) list = [];
  } catch { /* first write */ }
  list.push({ id: crypto.randomUUID(), endpoint, received: new Date().toISOString(), data });
  fs.writeFileSync(file, JSON.stringify(list, null, 2) + '\n');
}

async function handleAPI(req, res, pathname) {
  if (req.method !== 'POST') return sendJSON(res, 405, { ok: false, error: 'POST only' }, req);
  const rule = RULES[pathname];
  if (!rule) return sendJSON(res, 404, { ok: false, error: 'unknown endpoint' }, req);

  let data;
  try {
    const raw = await readBody(req);
    data = parseBody(raw, req.headers['content-type']);
  } catch (err) {
    return sendJSON(res, 400, { ok: false, error: err.message }, req);
  }
  if (!data || typeof data !== 'object') {
    return sendJSON(res, 415, { ok: false, error: 'send application/json or x-www-form-urlencoded' }, req);
  }

  const errors = {};
  if (String(data._gotcha ?? '').trim()) errors._gotcha = 'ফর্মটি পাঠানো যায়নি।'; // honeypot
  for (const f of rule.required) {
    if (!String(data[f] ?? '').trim()) errors[f] = 'এই তথ্যটি প্রয়োজন।';
  }
  if (Object.keys(errors).length === 0) rule.validate(data, errors);
  if (Object.keys(errors).length > 0) return sendJSON(res, 400, { ok: false, errors }, req);

  saveSubmission(pathname, data);
  console.log(`[form] ${pathname} received ${new Date().toISOString()}`);
  return sendJSON(res, 200, { ok: true }, req);
}

/* ── server ── */
const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url);
  try {
    if (pathname.startsWith('/api/')) return await handleAPI(req, res, pathname);
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return sendJSON(res, 405, { ok: false, error: 'GET only' }, req);
    }
    return serveStatic(req, res, pathname);
  } catch (err) {
    console.error('[server]', err.message);
    return sendJSON(res, 500, { ok: false, error: 'server error' }, req);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`swapnonir running on http://localhost:${PORT}`);
});
