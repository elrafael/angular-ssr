import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../shared/interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly apiPosts = '/api/posts/';
  private readonly apiComments = '/api/comments/';
  private readonly http = inject(HttpClient);

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiPosts}${postId}/comments`);
  }

  postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiComments}`, comment);
  }
}
