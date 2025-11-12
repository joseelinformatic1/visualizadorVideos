import React from 'react';
import { Media } from '../types/media';
import { buildPlayerUrl } from '../utils/player';
import './VideoPlayer.css';

interface VideoPlayerProps {
  media: Media | null;
}

/**
 * Componente de reproductor principal
 * Usa iframe del player propietario de Flumotion
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({ media }) => {
  if (!media) {
    return (
      <div className="video-player">
        <div className="video-player-empty">
          <p>Selecciona un video para reproducir</p>
        </div>
      </div>
    );
  }

  const playerUrl = buildPlayerUrl(media.mediaroute);

  return (
    <div className="video-player">
      <div className="video-player-container">
        <iframe
          src={playerUrl}
          title={media.title}
          className="video-player-iframe"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      <div className="video-player-info">
        <h2 className="video-player-title">{media.title}</h2>
        <p className="video-player-description">{media.description}</p>
        
        {media.tags && (
          <div className="video-player-tags">
            {media.tags.split(',').map((tag, index) => (
              <span key={index} className="tag">
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};