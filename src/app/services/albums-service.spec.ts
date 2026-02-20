import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AlbumsService } from './albums-service';
import { Album } from '../shared/interfaces/album';

describe('AlbumsService', () => {
  let service: AlbumsService;
  let httpMock: HttpTestingController;

  const mockAlbums: Album[] = [
    { id: 1, title: 'Album 1', totalPhotos: 5, coverUrl: 'url1', userId: 1 },
    { id: 2, title: 'Album 2', totalPhotos: 10, coverUrl: 'url2', userId: 1 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlbumsService,
        provideHttpClient(),
        provideHttpClientTesting(), // Músculo essencial para mocks de rede
      ],
    });
    service = TestBed.inject(AlbumsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Garante que não ficam pedidos pendentes (limpeza de fôlego)
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch albums via GET', () => {
    service.getAlbums().subscribe((albums) => {
      expect(albums.length).toBe(2);
      expect(albums).toEqual(mockAlbums);
    });

    // Verifica se o pedido foi feito para o URL correto
    const req = httpMock.expectOne('/api/albums');
    expect(req.request.method).toBe('GET');

    // Resolve o pedido com os dados mockados
    req.flush(mockAlbums);
  });
});
