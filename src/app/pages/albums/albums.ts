import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AlbumsService } from '../../services/albums-service';

@Component({
  selector: 'app-albums',
  imports: [RouterLink],
  templateUrl: './albums.html',
  styleUrl: './albums.scss',
})
export class Albums {
  private readonly albumsService = inject(AlbumsService);
  protected albums = rxResource({
    stream: () => this.albumsService.getAlbums(),
  });
}
