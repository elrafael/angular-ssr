import { ComponentFixture, DeferBlockState, TestBed } from '@angular/core/testing';

import { Albums } from './albums';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Album } from '../../shared/interfaces/album';
import { of } from 'rxjs';
import { AlbumsService } from '../../services/albums-service';

describe('Albums', () => {
  let component: Albums;
  let fixture: ComponentFixture<Albums>;

  const mockAlbums: Album[] = [
    {
      id: 1,
      title: 'Album Teste 1',
      totalPhotos: 10,
      coverUrl: 'test.jpg',
      userId: 0,
    },
    {
      id: 2,
      title: 'Album Teste 2',
      totalPhotos: 15,
      coverUrl: 'test2.jpg',
      userId: 1,
    },
  ];

  const albumsServiceMock = {
    getAlbums: vi.fn(() => of(mockAlbums)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Albums],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: AlbumsService, useValue: albumsServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Albums);
    component = fixture.componentInstance;
    // await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct title and description', () => {
    fixture.detectChanges();
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    const p = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(h1.textContent).toContain('Albums');
    expect(p.textContent).toContain('Explore the images collection');
  });

  it('should render albums when data is present', async () => {
    fixture.detectChanges();

    const deferBlock = (await fixture.getDeferBlocks())[0];

    await deferBlock.render(DeferBlockState.Complete);
    fixture.detectChanges();

    const albumsValues = (component as unknown as { albums: () => Album[] }).albums();
    expect(albumsValues.length).toBe(2);

    const albumTitle = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(albumTitle.textContent).toContain('Album Teste 1');

    expect(albumsServiceMock.getAlbums).toHaveBeenCalled();
  });

  it('should show placeholder skeletons while loading', () => {
    const skeletons = fixture.debugElement.queryAll(By.css('.animate-pulse'));
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
