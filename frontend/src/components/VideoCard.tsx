import React from 'react';
import { Media } from '../types/media';
import './VideoCard.css';

interface VideoCardProps {
  media: Media;
  isActive: boolean;
  onClick: () => void;
}

/**
 * Tarjeta de video individual para el grid
 * Muestra thumbnail y título
 * Indica visualmente si está activa (reproduciéndose)
 */
export const VideoCard: React.FC<VideoCardProps> = ({ media, isActive, onClick }) => {
  return (
    <div
      className={`video-card ${isActive ? 'video-card--active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="video-card-thumbnail">
        <img
          src={media.thumbnail.thumbnailroute}
          alt={media.title}
          className="video-card-image"
          loading="lazy"
          onError={(e) => {
            // Fallback si la imagen no carga
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/320x180?text=No+Image';
          }}
        />
        
        {/* Icono de play overlay */}
        <div className="video-card-overlay">
          <div className="play-icon">▶</div>
        </div>
        
        {/* Indicador de video activo */}
        {isActive && <div className="active-indicator" />}
      </div>
      
      <div className="video-card-content">
        <h3 className="video-card-title">{media.title}</h3>
      </div>
    </div>
  );
};