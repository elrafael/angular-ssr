import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../services/posts-service';
import { Post } from '../../shared/interfaces/post';

@Component({
  selector: 'app-posts',
  imports: [RouterLink],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts {
  private readonly postsService = inject(PostsService);
  protected posts: Signal<Post[]> = toSignal(this.postsService.getPosts(), { initialValue: [] });
}
