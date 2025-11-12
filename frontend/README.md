# Frontend - Visualizador de Videos

Aplicación web desarrollada en React + TypeScript para visualizar un catálogo de videos con reproductor integrado.

## 🏗️ Arquitectura

```
frontend/src/
├── components/
│   ├── VideoPlayer.tsx       # Reproductor principal (iframe)
│   ├── VideoPlayer.css
│   ├── VideoCard.tsx         # Tarjeta individual de video
│   ├── VideoCard.css
│   ├── VideoGrid.tsx         # Grid de miniaturas
│   └── VideoGrid.css
├── hooks/
│   └── useMedias.ts          # Hook para gestión de estado
├── services/
│   └── api.ts                # Cliente API REST
├── types/
│   └── media.ts              # Tipos TypeScript
├── utils/
│   └── player.ts             # Utilidades del player
├── App.tsx                   # Componente principal
├── App.css
├── index.tsx
└── index.css
```

## 🎯 Componentes Principales

### VideoPlayer
Reproductor principal que usa el player propietario de Flumotion mediante iframe.

**Props:**
- `media: Media | null` - Video a reproducir

**Características:**
- Iframe apuntando a `https://cdnapi.codev8.net/cms-player/default.iframe`
- Query string `injectSrc` con la URL del video
- Muestra título, descripción y tags

### VideoGrid
Grid responsivo de miniaturas de videos.

**Props:**
- `medias: Media[]` - Lista de videos
- `activeMediaId: string | null` - ID del video activo
- `onMediaSelect: (media: Media) => void` - Callback al seleccionar

**Características:**
- Grid responsivo (3 → 2 → 1 columnas)
- Indicador visual del video activo
- Hover effects

### VideoCard
Tarjeta individual de video.

**Props:**
- `media: Media` - Datos del video
- `isActive: boolean` - Si está reproduciéndose
- `onClick: () => void` - Callback al hacer clic

## 🪝 Hooks Personalizados

### useMedias
Hook que encapsula toda la lógica de gestión de medias.

**Retorna:**
```typescript
{
  medias: Media[];              // Lista de videos
  loading: boolean;             // Estado de carga
  error: string | null;         // Error si existe
  activeMedia: Media | null;    // Video seleccionado
  setActiveMedia: (media: Media) => void;  // Cambiar video activo
  refetch: () => Promise<void>; // Recargar datos
}
```

## 🔧 Configuración

### Variables de entorno

Crea un archivo `.env` en la raíz del frontend:

```env
REACT_APP_API_URL=http://localhost:3001
```

Si no se proporciona, usa `http://localhost:3001` por defecto.

## 🚀 Scripts Disponibles

```powershell
npm start       # Modo desarrollo (http://localhost:3000)
npm run build   # Build de producción
npm test        # Ejecutar tests
```

## 🎨 Estilos

- **Mobile-first**: Diseño responsivo desde móvil
- **CSS puro**: Sin frameworks de estilos
- **Variables CSS**: Para colores y espaciados consistentes
- **Animaciones**: Transiciones suaves y feedback visual

### Breakpoints
- **Desktop**: > 1024px (3 columnas)
- **Tablet**: 768px - 1024px (2 columnas)
- **Mobile**: < 768px (1 columna)

## 📡 Integración con Backend

El frontend consume la API REST del backend:

```typescript
// Obtener videos
const medias = await fetchMedias();

// Añadir video
const newMedia = await addMedia(mediaData);
```

## 🎬 Reproductor de Videos

El player se integra mediante iframe:

```typescript
const playerUrl = `https://cdnapi.codev8.net/cms-player/default.iframe?injectSrc=${encodeURIComponent(mediaroute)}`;
```

**Características del player:**
- Autoplay habilitado
- Fullscreen permitido
- Picture-in-picture habilitado

## 📝 Notas Técnicas

- **TypeScript strict**: Máxima seguridad de tipos
- **React 18**: Usa las últimas características
- **Hooks personalizados**: Lógica reutilizable
- **Lazy loading**: Imágenes con loading="lazy"
- **Error boundaries**: Manejo de errores robusto
- **Accesibilidad**: role, tabIndex, aria-labels