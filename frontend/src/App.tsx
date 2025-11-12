import React from 'react';
import { useMedias } from './hooks/useMedias';
import { VideoPlayer } from './components/VideoPlayer';
import { VideoGrid } from './components/VideoGrid';
import './App.css';

/**
 * Componente principal de la aplicación
 * Orquesta VideoPlayer (reproductor principal) y VideoGrid (lista de miniaturas)
 */
function App() {
  const { medias, loading, error, activeMedia, setActiveMedia } = useMedias();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🎬 Visualizador de Videos</h1>
          <p>Disfruta de nuestro catálogo de contenido</p>
        </div>
      </header>

      <main className="app-main">
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Cargando videos...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>❌ {error}</p>
            <button onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        ) : (
          <>
            <VideoPlayer media={activeMedia} />
            <VideoGrid
              medias={medias}
              activeMediaId={activeMedia?.id || null}
              onMediaSelect={setActiveMedia}
            />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Flumotion - Visualizador de Videos</p>
      </footer>
    </div>
  );
}

export default App;
