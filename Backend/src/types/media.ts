export interface MediaStored {
  id: string;
  title: string;
  description: string;
  duration: number;
  tags: string;
  filedata: {
    bitrate: number;
    fileSize: number;
    filename: string;
  };
  thumbnail: {
    id: string;
    name: string;
    filename: string;
  };
}

export type NewMedia = Omit<MediaStored, 'id'>;

export interface MediaResponse extends MediaStored {
  mediaroute: string;
  thumbnail: MediaStored['thumbnail'] & {
    thumbnailroute: string;
  };
}