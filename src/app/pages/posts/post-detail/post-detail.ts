import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { PostsService } from '../../../services/posts-service';
import { UsersService } from '../../../services/users-service';
import { Comments } from '../../../shared/components/comments/comments';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink, Comments],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss',
})
export class PostDetail {
  private readonly postService = inject(PostsService);
  private readonly usersService = inject(UsersService);
  id = input.required<string>();

  protected post = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.postService.getPost(id))),
  );

  protected user = toSignal(
    toObservable(this.post).pipe(
      filter((post) => !!post),
      switchMap((post) => this.usersService.getUser(post.userId)),
    ),
  );
}
