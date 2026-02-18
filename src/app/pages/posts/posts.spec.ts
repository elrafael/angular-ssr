import { ComponentFixture, DeferBlockState, TestBed } from '@angular/core/testing';
import { Posts } from './posts';
import { of } from 'rxjs';
import { PostsService } from '../../services/posts-service';
import { Post } from '../../shared/interfaces/post';

describe('Posts', () => {
  let component: Posts;
  let fixture: ComponentFixture<Posts>;

  const mockPosts = [
    { id: 1, title: 'Post 1', body: 'This is the first post.' },
    { id: 2, title: 'Post 2', body: 'This is the second post.' },
  ];

  const postsServiceMock = {
    getPosts: vi.fn(() => of(mockPosts)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Posts],
      providers: [{ provide: PostsService, useValue: postsServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Posts);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on initialization', () => {
    fixture.detectChanges();
    const postsValues = (component as unknown as { posts: () => Post[] }).posts();

    expect(postsValues.length).toBe(2);
    expect(postsValues[0].title).toBe('Post 1');
    expect(postsServiceMock.getPosts).toHaveBeenCalled();
  });

  it('should render posts in the template', async () => {
    const deferBlocks = await fixture.getDeferBlocks();
    if (deferBlocks.length > 0) {
      await deferBlocks[0].render(DeferBlockState.Complete);
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const postTitles = compiled.querySelectorAll('h3');

    expect(postTitles.length).toBe(2);
    expect(postTitles[0].textContent).toBe('Post 1');
    expect(postTitles[1].textContent).toBe('Post 2');
  });
});
