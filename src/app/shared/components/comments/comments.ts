import { Component, inject, input, Signal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { CommentsService } from '../../../services/comments-service';
import { Comment } from '../../interfaces/comment';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UsersService } from '../../../services/users-service';

@Component({
  selector: 'app-comments',
  imports: [ReactiveFormsModule],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments {
  private readonly commentsService = inject(CommentsService);
  private readonly usersService = inject(UsersService);
  postId = input.required<string>();

  commentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required]),
    body: new FormControl('', Validators.required),
  });

  protected users: Signal<User[]> = toSignal(this.usersService.getAllUsers(), {
    initialValue: [],
  });

  protected comments = signal<Comment[]>([]);
  private readonly commentsLoader = toObservable(this.postId)
    .pipe(
      switchMap((id) => this.commentsService.getComments(id)),
      tap((data) => this.comments.set(data)),
    )
    .subscribe();

  submitComment() {
    const formValue = this.commentForm.value;
    if (formValue.name && formValue.email && formValue.body) {
      this.commentsService
        .postComment({
          postId: this.postId(),
          id: Math.floor(Math.random() * 1000000),
          name: formValue.name,
          email: formValue.email,
          body: formValue.body,
        })
        .subscribe((commentResponse) => {
          this.comments.update((lista) => [...lista, commentResponse]);
        });
      this.commentForm.reset();
    } else {
      console.log('Por favor, preencha todos os campos do comentário.');
    }
  }
}
