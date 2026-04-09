import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoResponse } from '../shared/interfaces/photo';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private readonly api = '/api/albums';
  private readonly http = inject(HttpClient);

  getPhotos(albumId: string): Observable<PhotoResponse> {
    return this.http.get<PhotoResponse>(`${this.api}/${albumId}/photos`);
  }
}
