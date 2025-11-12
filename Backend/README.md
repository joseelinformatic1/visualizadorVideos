# Backend - API REST

API en Node.js + TypeScript que gestiona el catálogo de videos.

## 🚀 Instalación

```powershell
npm install
```

## ▶️ Ejecución

```powershell
npm start
```

Servidor escuchando en `http://localhost:3001`

## 📡 Endpoints

### GET /getmedias
Obtiene todos los videos con rutas construidas dinámicamente.

**Response:**
```json
[
  {
    "id": "...",
    "title": "Plane sample",
    "mediaroute": "https://storagecdn.codev8.net/ondemand/...",
    "thumbnail": {
      "thumbnailroute": "https://progressive.codev8.net/..."
    }
  }
]
```

### POST /addmedias
Agrega un nuevo video al catálogo.

**Body:**
```json
{
  "title": "Nuevo video",
  "description": "Descripción",
  "duration": 120,
  "tags": "tag1,tag2",
  "filedata": {
    "bitrate": 1500,
    "fileSize": 123456,
    "filename": "video.mp4"
  },
  "thumbnail": {
    "id": "thumb-1",
    "name": "thumbnail",
    "filename": "video_thumb.jpg"
  }
}
```

## 🏗️ Estructura

```
Backend/
├── src/
│   ├── types/
│   │   └── media.ts         # Tipos TypeScript
│   ├── services/
│   │   └── mediaService.ts  # Lógica de negocio
│   ├── config.ts            # Configuración (CDN URLs)
│   └── server.ts            # Servidor HTTP
├── data/
│   └── medias.json          # Base de datos JSON
├── package.json
└── tsconfig.json
```

## 🔧 Configuración

Edita `src/config.ts` para cambiar:
- ACCOUNT_ID
- VIDEO_CDN
- THUMB_CDN
- PLAYER_IFRAME_BASE

## 📦 Datos

Los videos se almacenan en `data/medias.json`. Las rutas `mediaroute` y `thumbnailroute` se construyen dinámicamente en cada petición.
```