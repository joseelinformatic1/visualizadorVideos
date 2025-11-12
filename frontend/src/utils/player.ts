const PLAYER_BASE_URL = 'https://cdnapi.codev8.net/cms-player/default.iframe';

/**
 * Construye la URL del iframe del player con la ruta del media
 * @param mediaRoute URL completa del video a reproducir
 * @returns URL completa del iframe con query string injectSrc
 */
export function buildPlayerUrl(mediaRoute: string): string {
  const params = new URLSearchParams({
    injectSrc: mediaRoute,
  });
  
  return `${PLAYER_BASE_URL}?${params.toString()}`;
}

/**
 * Formatea la duración en segundos a formato MM:SS
 * @param seconds Duración en segundos
 * @returns String formateado (ej: "29:19")
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}