import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import type { HttpErrorResponse } from '@angular/common/http';

import { CommentsService } from './comments-service';
import { Comment } from '../shared/interfaces/comment';

describe('CommentsService', () => {
  let service: CommentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService],
    });
    service = TestBed.inject(CommentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getComments should GET comments for a post', async () => {
    const mockComments: Comment[] = [
      { postId: '1', id: 1, name: 'User', email: 'u@example.com', body: 'hello' },
    ];

    const obs = service.getComments('1');
    const promise = firstValueFrom(obs);
    const req = httpMock.expectOne('/api/posts/1/comments');
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
    const res = await promise;
    expect(res).toEqual(mockComments);
  });

  it('postComment should POST and return the created comment', async () => {
    const newComment: Comment = {
      postId: '1',
      id: 0,
      name: 'New',
      email: 'n@example.com',
      body: 'ok',
    };

    const obs = service.postComment(newComment);
    const promise = firstValueFrom(obs);
    const req = httpMock.expectOne('/api/comments/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newComment);
    req.flush({ ...newComment, id: 123 });
    const created = await promise;
    expect(created.id).toBe(123);
  });

  it('getComments should propagate HTTP errors', async () => {
    const obs = service.getComments('999');
    const promise = firstValueFrom(obs);
    const req = httpMock.expectOne('/api/posts/999/comments');
    req.flush({ message: 'Not found' }, { status: 404, statusText: 'Not Found' });
    try {
      await promise;
      throw new Error('expected an error');
    } catch (err: unknown) {
      const httpErr = err as HttpErrorResponse;
      expect(httpErr.status).toBe(404);
    }
  });
});
