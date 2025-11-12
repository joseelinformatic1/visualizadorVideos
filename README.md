# 🎬 Visualizador de Videos - Flumotion Test

Aplicación full-stack para visualización de contenido multimedia usando React + TypeScript (frontend) y Node.js + TypeScript (backend).

## 📋 Descripción

Sistema de reproducción de videos que permite:
- Visualizar videos mediante player propietario (iframe)
- Explorar catálogo de videos con miniaturas
- Seleccionar y reproducir contenido
- Indicador visual del video activo

## 🏗️ Arquitectura

```
visualizador-videos/
├── Backend/          # API REST en Node.js + TypeScript
├── frontend/         # SPA en React + TypeScript
└── README.md
```

## 🚀 Inicio Rápido

### Requisitos previos

- Node.js 18+ 
- npm 9+

### Backend

```powershell
cd Backend
npm install
npm start
# Servidor corriendo en http://localhost:3001
```

**Endpoints:**
- `GET /getmedias` - Lista de videos
- `POST /addmedias` - Agregar video

### Frontend

```powershell
cd frontend
npm install
npm start
# Aplicación corriendo en http://localhost:3000
```

## 🛠️ Tecnologías

**Backend:**
- Node.js
- TypeScript
- HTTP nativo (sin frameworks)
- File system JSON storage

**Frontend:**
- React 18
- TypeScript
- CSS3 (sin preprocesadores)
- Custom hooks
- Responsive design

## 📦 Estructura de datos

### Media Object

```typescript
{
  id: string
  title: string
  description: string
  duration: number
  tags: string
  filedata: {
    bitrate: number
    fileSize: number
    filename: string
  }
  thumbnail: {
    id: string
    name: string
    filename: string
    thumbnailroute: string  // Construido dinámicamente
  }
  mediaroute: string        // Construido dinámicamente
}
```

## 🎯 Características

✅ Player principal con iframe de Flumotion  
✅ Grid responsivo de miniaturas  
✅ Indicador visual de video activo  
✅ Loading states y error handling  
✅ Código TypeScript strict  
✅ Componentes reutilizables  
✅ Mobile-first design  

## 📝 Licencia

Proyecto de prueba técnica - Flumotion

## 👤 Autor

Jose - Candidato Test Flumotion
```