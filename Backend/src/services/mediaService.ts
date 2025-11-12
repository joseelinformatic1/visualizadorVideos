import fs from 'fs';
import { DATA_PATH, buildMediaRoute, buildThumbRoute } from '../config';
import { MediaStored, MediaResponse, NewMedia } from '../types/media';
import crypto from 'crypto';

function ensureStore() {
  const dir = require('path').dirname(DATA_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, '[]', 'utf8');
}

function readAll(): MediaStored[] {
  ensureStore();
  const raw = fs.readFileSync(DATA_PATH, 'utf8') || '[]';
  const data = JSON.parse(raw);
  return Array.isArray(data) ? (data as MediaStored[]) : [];
}

function writeAll(list: MediaStored[]) {
  ensureStore();
  fs.writeFileSync(DATA_PATH, JSON.stringify(list, null, 2), 'utf8');
}

function uuid() {
  return (crypto as any).randomUUID ? crypto.randomUUID() :
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
}

// Validación mínima de NewMedia
export function validateNewMedia(obj: any): { ok: true } | { ok: false; errors: string[] } {
  const e: string[] = [];
  const isStr = (v: any) => typeof v === 'string' && v.trim().length > 0;
  const isNum = (v: any) => typeof v === 'number' && Number.isFinite(v);

  if (!obj || typeof obj !== 'object') e.push('Body must be an object');

  if (!isStr(obj?.title)) e.push('title is required');
  if (!isStr(obj?.description)) e.push('description is required');
  if (!isNum(obj?.duration)) e.push('duration is required');
  if (!isStr(obj?.tags)) e.push('tags is required');

  if (!obj?.filedata || typeof obj.filedata !== 'object') {
    e.push('filedata is required');
  } else {
    if (!isNum(obj.filedata.bitrate)) e.push('filedata.bitrate is required');
    if (!isNum(obj.filedata.fileSize)) e.push('filedata.fileSize is required');
    if (!isStr(obj.filedata.filename)) e.push('filedata.filename is required');
  }

  if (!obj?.thumbnail || typeof obj.thumbnail !== 'object') {
    e.push('thumbnail is required');
  } else {
    if (!isStr(obj.thumbnail.id)) e.push('thumbnail.id is required');
    if (!isStr(obj.thumbnail.name)) e.push('thumbnail.name is required');
    if (!isStr(obj.thumbnail.filename)) e.push('thumbnail.filename is required');
  }

  return e.length ? { ok: false, errors: e } : { ok: true };
}

function withRoutes(m: MediaStored): MediaResponse {
  const mediaroute = buildMediaRoute(m.filedata.filename);
  const thumbnailroute = buildThumbRoute(m.thumbnail.filename);
  return {
    ...m,
    mediaroute,
    thumbnail: { ...m.thumbnail, thumbnailroute }
  };
}

export function getMedias(): MediaResponse[] {
  return readAll()
    .filter(m => m?.filedata?.filename && m?.thumbnail?.filename)
    .map(withRoutes);
}

export function addMedia(data: NewMedia): MediaResponse {
  const all = readAll();
  const stored: MediaStored = { id: uuid(), ...data };
  all.push(stored);
  writeAll(all);
  return withRoutes(stored);
}