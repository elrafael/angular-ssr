import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { of } from 'rxjs';

import { Comments } from './comments';
import { CommentsService } from '../../../services/comments-service';
import { UsersService } from '../../../services/users-service';

describe('Comments', () => {
  let component: Comments;
  let fixture: ComponentFixture<Comments>;

  const commentsServiceMock = {
    getComments: vi.fn().mockReturnValue(of([])),
    postComment: vi.fn().mockReturnValue(of({})),
  };

  const usersServiceMock = {
    getAllUsers: vi
      .fn()
      .mockReturnValue(of([{ id: 1, name: 'User Test', username: 'usertest', email: 'a@b.com' }])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comments],
      providers: [
        provideRouter([], withComponentInputBinding()),
        { provide: CommentsService, useValue: commentsServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compileComponents();
  });

  it('should create and load comments and users', async () => {
    fixture = TestBed.createComponent(Comments);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('postId', '1');

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component).toBeTruthy();
    expect(commentsServiceMock.getComments).toHaveBeenCalledWith('1');
    expect(usersServiceMock.getAllUsers).toHaveBeenCalled();
  });

  it('should call postComment when submitting a valid form', async () => {
    fixture = TestBed.createComponent(Comments);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('postId', '1');

    fixture.detectChanges();
    await fixture.whenStable();

    component.commentForm.setValue({ name: 'John', email: 'john@example.com', body: 'Nice post' });

    component.submitComment();

    expect(commentsServiceMock.postComment).toHaveBeenCalled();
  });
});
