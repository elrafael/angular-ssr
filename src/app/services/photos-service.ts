import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Photo } from '../shared/interfaces/photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private readonly api = '/api/albums';
  private readonly http = inject(HttpClient);

  getPhotos(albumId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.api}/${albumId}/photos`);
  }
}
