import React from 'react';
import { Media } from '../types/media';
import { VideoCard } from './VideoCard';
import './VideoGrid.css';

interface VideoGridProps {
  medias: Media[];
  activeMediaId: string | null;
  onMediaSelect: (media: Media) => void;
}

/**
 * Grid de tarjetas de video
 * Renderiza todas las miniaturas en un grid responsivo
 */
export const VideoGrid: React.FC<VideoGridProps> = ({
  medias,
  activeMediaId,
  onMediaSelect,
}) => {
  if (medias.length === 0) {
    return (
      <div className="video-grid-empty">
        <p>No hay videos disponibles</p>
      </div>
    );
  }

  return (
    <div className="video-grid">
      <h2 className="video-grid-title">
        Catálogo de Videos ({medias.length})
      </h2>
      
      <div className="video-grid-container">
        {medias.map((media) => (
          <VideoCard
            key={media.id}
            media={media}
            isActive={media.id === activeMediaId}
            onClick={() => onMediaSelect(media)}
          />
        ))}
      </div>
    </div>
  );
};