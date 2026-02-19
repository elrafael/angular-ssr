import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { PostsService } from '../../../services/posts-service';
import { filter, switchMap } from 'rxjs';
import { CommentsService } from '../../../services/comments-service';
import { UsersService } from '../../../services/users-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss',
})
export class PostDetail {
  private readonly postService = inject(PostsService);
  private readonly commentsService = inject(CommentsService);
  private readonly usersService = inject(UsersService);
  id = input.required<string>();

  protected post = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.postService.getPost(id))),
  );

  protected comments = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.commentsService.getComments(id))),
  );

  protected user = toSignal(
    toObservable(this.post).pipe(
      // Filtramos para não disparar se o post for undefined/null
      filter((post) => !!post),
      switchMap((post) => this.usersService.getUser(post!.userId)),
    ),
  );
}
