import { Component, inject, Signal } from '@angular/core';
import { Album } from '../../shared/interfaces/album';
import { AlbumsService } from '../../services/albums-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-albums',
  imports: [RouterLink],
  templateUrl: './albums.html',
  styleUrl: './albums.scss',
})
export class Albums {
  private readonly albumsService = inject(AlbumsService);
  protected albums: Signal<Album[]> = toSignal(this.albumsService.getAlbums(), {
    initialValue: [],
  });
}
