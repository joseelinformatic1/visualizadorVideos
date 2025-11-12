export interface Media {
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
    thumbnailroute: string;
  };
  mediaroute: string;
}