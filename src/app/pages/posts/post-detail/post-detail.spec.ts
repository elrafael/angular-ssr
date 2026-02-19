import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { PostDetail } from './post-detail';
import { of } from 'rxjs';
import { PostsService } from '../../../services/posts-service';
import { UsersService } from '../../../services/users-service';
import { CommentsService } from '../../../services/comments-service';

describe('PostDetail', () => {
  let component: PostDetail;
  let fixture: ComponentFixture<PostDetail>;

  beforeEach(async () => {
    const postsServiceMock = { getPost: () => of({ id: 1, title: 'Test', userId: 1 }) };
    const usersServiceMock = { getUser: () => of({ id: 1, name: 'User Test' }) };
    const commentsServiceMock = { getComments: () => of([]) };

    await TestBed.configureTestingModule({
      imports: [PostDetail],
      providers: [
        provideRouter([], withComponentInputBinding()),
        { provide: PostsService, useValue: postsServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: CommentsService, useValue: commentsServiceMock },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(PostDetail);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('id', '1');

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
