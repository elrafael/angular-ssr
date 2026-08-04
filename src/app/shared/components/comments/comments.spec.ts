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

  it('renders users in select, shows placeholder initially, enables submit and appends comment on click', async () => {
    fixture = TestBed.createComponent(Comments);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('postId', '1');

    // initial render (placeholder should be present before deferred content loads)
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const placeholder = el.querySelector('section div');
    expect(placeholder?.textContent).toContain('Passe o rato aqui');

    // simulate hover to trigger @defer content loading
    placeholder?.dispatchEvent(new Event('mouseenter'));
    await fixture.whenStable();
    fixture.detectChanges();

    // users should now be rendered in the select options
    const options = Array.from(el.querySelectorAll('select#email option')) as HTMLOptionElement[];
    expect(options.length).toBeGreaterThan(0);
    expect(options[0].textContent).toContain('User Test');

    // submit button disabled when form invalid
    const submitBtn = el.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);

    // set form values to enable submit
    component.commentForm.setValue({ name: 'John', email: 'john@example.com', body: 'Nice post' });
    fixture.detectChanges();
    expect(submitBtn.disabled).toBe(false);

    // make postComment return a real comment and click the button
    commentsServiceMock.postComment.mockReturnValueOnce(
      of({ id: 99, postId: '1', name: 'John', email: 'john@example.com', body: 'Nice post' }),
    );

    submitBtn.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(commentsServiceMock.postComment).toHaveBeenCalled();

    // the new comment should be rendered in the list
    const commentEmails = Array.from(el.querySelectorAll('.space-y-4 .font-bold')).map((n) =>
      n.textContent?.trim(),
    );
    expect(commentEmails).toContain('john@example.com');
  });
});
