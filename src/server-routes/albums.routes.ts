import { Router } from 'express';
import { Album } from '../app/shared/interfaces/album';
import { Photo } from '../app/shared/interfaces/photo';

export const albumsRouter = Router();
albumsRouter.get('/api/albums', async (req, res) => {
  try {
    // 1. Vai buscar apenas a lista de álbuns primeiro
    const albumsRes = await fetch('https://jsonplaceholder.typicode.com/albums?_limit=12');
    const albums: Album[] = await albumsRes.json();

    // 2. Para cada álbum, dispara um pedido para obter APENAS as fotos desse álbum
    // O Promise.all garante que estes pedidos corram em paralelo
    const enrichedAlbums = await Promise.all(
      albums.map(async (album) => {
        const photosRes = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`,
        );
        const photos: Photo[] = await photosRes.json();

        return {
          ...album,
          totalPhotos: photos.length,
          coverUrl: `https://picsum.photos/seed/${album.id}/600/600`,
        };
      }),
    );

    res.status(200).json(enrichedAlbums);
  } catch (error) {
    console.error('Error fetching enriched albums:', error);
    res.status(500).json({ error: 'Failed to fetch albums' });
  }
});
albumsRouter.get('/api/albums/:id/photos', async (req, res) => {
  try {
    const id = req.params['id'];

    const [albumRes, photosRes] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/albums/${id}`),
      fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`),
    ]);

    const albumData = await albumRes.json();
    const photosData = await photosRes.json();

    const response = {
      albumTitle: albumData.title,
      photos: photosData.map((photo: Photo) => ({
        ...photo,
        url: `https://picsum.photos/seed/${photo.id}/600/600`,
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});
