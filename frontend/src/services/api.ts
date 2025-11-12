import { Media } from '../types/media';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Obtiene todos los medias disponibles desde el backend
 * @returns Promise<Media[]> Lista de medias con rutas construidas
 */
export async function fetchMedias(): Promise<Media[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/getmedias`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: Media[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching medias:', error);
    throw error;
  }
}

/**
 * Añade un nuevo media al backend
 * @param media Media sin id (será generado por el backend)
 * @returns Promise<Media> Media creado con rutas construidas
 */
export async function addMedia(media: Omit<Media, 'id' | 'mediaroute' | 'thumbnail'>): Promise<Media> {
  try {
    const response = await fetch(`${API_BASE_URL}/addmedias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(media),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: Media = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding media:', error);
    throw error;
  }
}