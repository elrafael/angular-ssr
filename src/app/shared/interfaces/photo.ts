export interface PhotoResponse {
  albumTitle: string;
  photos: Photo[];
}
export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
}
