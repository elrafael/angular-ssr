import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Album } from '../shared/interfaces/album';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  private readonly api = '/api/albums';
  private readonly http = inject(HttpClient);

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.api);
  }
}
