import { ComponentFixture, DeferBlockState, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PostsService } from '../../services/posts-service';
import { Post } from '../../shared/interfaces/post';
import { Posts } from './posts';
import { provideRouter, withComponentInputBinding } from '@angular/router';

describe('Posts', () => {
  let component: Posts;
  let fixture: ComponentFixture<Posts>;

  const mockPosts: Post[] = [
    {
      id: 1,
      title: 'Post 1',
      body: 'This is the first post.',
      userId: '',
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'This is the second post.',
      userId: '',
    },
  ];

  const postsServiceMock = {
    getPosts: vi.fn(() => of(mockPosts)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Posts],
      providers: [
        { provide: PostsService, useValue: postsServiceMock },
        provideRouter([], withComponentInputBinding()),
      ],
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
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const postTitles = compiled.querySelectorAll('h2');

    expect(postTitles.length).toBe(2);
    expect(postTitles[0].textContent?.trim()).toBe('Post 1');
    expect(postTitles[1].textContent?.trim()).toBe('Post 2');
  });

  it('should render 6 skeleton cards during placeholder state', async () => {
    const deferBlocks = await fixture.getDeferBlocks();

    await deferBlocks[0].render(DeferBlockState.Placeholder);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const skeletons = compiled.querySelectorAll('.animate-pulse');

    expect(skeletons.length).toBe(6);
  });

  it('should show empty state message when service returns no posts', async () => {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [Posts],
      providers: [{ provide: PostsService, useValue: { getPosts: () => of([]) } }],
    }).compileComponents();

    const emptyFixture = TestBed.createComponent(Posts);
    emptyFixture.detectChanges();

    const deferBlocks = await emptyFixture.getDeferBlocks();
    await deferBlocks[0].render(DeferBlockState.Complete);
    emptyFixture.detectChanges();

    expect(emptyFixture.nativeElement.textContent).toContain('No posts available');
  });
  it('should render error state when service fails', async () => {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [Posts],
      providers: [
        {
          provide: PostsService,
          useValue: { getPosts: () => throwError(() => new Error('Simulated API Failure')) },
        },
      ],
    }).compileComponents();

    const errorFixture = TestBed.createComponent(Posts);
    errorFixture.detectChanges();

    const deferBlocks = await errorFixture.getDeferBlocks();

    await deferBlocks[0].render(DeferBlockState.Error);
    errorFixture.detectChanges();

    const compiled = errorFixture.nativeElement as HTMLElement;
    const errorMessage = compiled.querySelector('.text-red-700');

    expect(errorMessage?.textContent).toContain('Failed to load posts');
    expect(compiled.innerHTML).toContain('bg-red-50');
  });
});
