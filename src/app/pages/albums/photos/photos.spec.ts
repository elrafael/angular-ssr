import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Photos } from './photos';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { PhotosService } from '../../../services/photos-service';

describe('Photos', () => {
  let component: Photos;
  let fixture: ComponentFixture<Photos>;
  let mockPhotosService: Partial<PhotosService>;

  beforeEach(async () => {
    mockPhotosService = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getPhotos: (_: string) => of({ albumTitle: '', photos: [] }),
    };

    await TestBed.configureTestingModule({
      imports: [Photos],
      providers: [
        provideHttpClient(),
        provideRouter([], withComponentInputBinding()),
        { provide: PhotosService, useValue: mockPhotosService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Photos);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('id', '1');
    expect(component).toBeTruthy();
  });

  it('should have the correct id from input', () => {
    fixture.componentRef.setInput('id', '1');
    expect(component.id()).toBe('1');
  });

  it('renders album title, photo count and images when photos exist', () => {
    const photos = [
      { albumId: 1, id: 11, title: 'First', url: 'https://example.com/1.jpg' },
      { albumId: 1, id: 12, title: 'Second', url: 'https://example.com/2.jpg' },
    ];
    const response = { albumTitle: 'Holiday', photos };

    mockPhotosService.getPhotos = () => of(response);

    fixture.componentRef.setInput('id', '1');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const heading = el.querySelector('h1');
    const paragraph = el.querySelector('p');
    const imgs = Array.from(el.querySelectorAll('img')) as HTMLImageElement[];

    expect(heading?.textContent?.trim()).toBe('Holiday');
    expect(paragraph?.textContent).toContain(String(photos.length));
    expect(imgs.length).toBe(photos.length);
    expect(imgs[0].src).toBe(photos[0].url);
    expect(imgs[0].alt).toBe(photos[0].title);
  });

  it('renders loading skeleton placeholders when there are no photos', () => {
    const response = { albumTitle: 'Empty Album', photos: [] };
    mockPhotosService.getPhotos = () => of(response);

    fixture.componentRef.setInput('id', '2');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const placeholders = el.querySelectorAll('.animate-pulse');

    expect(placeholders.length).toBe(0);
  });
});
