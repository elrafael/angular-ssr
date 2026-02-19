import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../shared/interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly api = '/api/posts';
  private readonly http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.api);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.api}/${id}`);
  }
}
