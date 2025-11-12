import { useState, useEffect, useCallback } from 'react';
import { Media } from '../types/media';
import { fetchMedias } from '../services/api';

interface UseMediasReturn {
  medias: Media[];
  loading: boolean;
  error: string | null;
  activeMedia: Media | null;
  setActiveMedia: (media: Media) => void;
  refetch: () => Promise<void>;
}

/**
 * Hook personalizado para gestionar el estado de medias
 * - Carga automática al montar
 * - Gestión de estado de carga y errores
 * - Selección de media activo
 */
export function useMedias(): UseMediasReturn {
  const [medias, setMedias] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMedia, setActiveMedia] = useState<Media | null>(null);

  const loadMedias = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchMedias();
      
      setMedias(data);
      
      // Seleccionar el primer media por defecto si existe
      if (data.length > 0 && !activeMedia) {
        setActiveMedia(data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar videos');
      console.error('Error loading medias:', err);
    } finally {
      setLoading(false);
    }
  }, [activeMedia]);

  useEffect(() => {
    loadMedias();
  }, []);

  return {
    medias,
    loading,
    error,
    activeMedia,
    setActiveMedia,
    refetch: loadMedias,
  };
}