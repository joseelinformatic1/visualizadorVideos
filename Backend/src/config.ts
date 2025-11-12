import path from 'path';

export const ACCOUNT_ID = process.env.ACCOUNT_ID || 'b4ab8f95-bc2b-4d88-8ff0-df4df19d206c';
export const VIDEO_CDN = process.env.VIDEO_CDN || 'https://storagecdn.codev8.net';
export const THUMB_CDN = process.env.THUMB_CDN || 'https://progressive.codev8.net';
export const PLAYER_IFRAME_BASE = process.env.PLAYER_IFRAME_BASE || 'https://cdnapi.codev8.net/cms-player/default.iframe?injectSrc=';

export const DATA_PATH = path.join(__dirname, '..', 'data', 'medias.json');

// Helpers de construcción de rutas
export const buildMediaRoute = (filename: string) =>
  `${VIDEO_CDN}/ondemand/${ACCOUNT_ID}/${filename}`;

export const buildThumbRoute = (filename: string) =>
  `${THUMB_CDN}/userdatanew/${ACCOUNT_ID}/thumbnails/${filename}`;

// Útil si en el front quieres un iframe ya armado
export const buildPlayerIframe = (mediaRoute: string) =>
  `${PLAYER_IFRAME_BASE}${encodeURIComponent(mediaRoute)}`;