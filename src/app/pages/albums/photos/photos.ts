import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
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

  protected albumDetails = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.photosService.getPhotos(id))),
  );
  // protected albumDetails2 = rxResource({
  //   params: () => this.id(),
  //   stream: ({ params }) => this.photosService.getPhotos(params),
  // });

  // protected photos = computed(() => this.albumDetails2.value()?.photos ?? []);

  // protected albumTitle = computed(
  //   () => this.albumDetails2.value()?.albumTitle ?? 'Carregando álbum...',
  // );
}
