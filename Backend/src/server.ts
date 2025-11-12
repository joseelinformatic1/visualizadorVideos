import http from 'http';
import { addMedia, getMedias, validateNewMedia } from './services/mediaService';

const PORT = Number(process.env.PORT || 3001);

function send(res: http.ServerResponse, code: number, data: unknown) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return send(res, 200, {});

  // Rutas
  if (req.method === 'GET' && req.url === '/getmedias') {
    return send(res, 200, getMedias());
  }

  if (req.method === 'POST' && req.url === '/addmedias') {
    let body = '';
    req.on('data', c => (body += c));
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const val = validateNewMedia(payload);
        if (val.ok !== true) return send(res, 400, { error: 'ValidationError', details: val.errors });
        const created = addMedia(payload);
        return send(res, 201, created);
      } catch {
        return send(res, 400, { error: 'Invalid JSON body' });
      }
    });
    return;
  }

  return send(res, 404, { error: 'Not Found' });
});

server.listen(PORT, () => {
  console.log(`Backend listo: http://localhost:${PORT}`);
  console.log('GET  /getmedias');
  console.log('POST /addmedias');
});