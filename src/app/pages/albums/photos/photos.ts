import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { PhotosService } from '../../../services/photos-service';

@Component({
  selector: 'app-photos',
  imports: [RouterLink],
  templateUrl: './photos.html',
  styleUrl: './photos.scss',
})
export class Photos {
  private readonly photosService = inject(PhotosService);
  readonly id = input.required<string>();
  protected albumDetails = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.photosService.getPhotos(params),
  });

  protected photos = computed(() => this.albumDetails.value()?.photos ?? []);

  protected albumTitle = computed(
    () => this.albumDetails.value()?.albumTitle ?? 'Carregando álbum...',
  );
}
