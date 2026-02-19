import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../shared/interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly api = '/api/posts/';
  private readonly http = inject(HttpClient);

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.api}${postId}/comments`);
  }
}
