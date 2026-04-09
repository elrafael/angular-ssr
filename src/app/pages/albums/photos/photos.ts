import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { PhotosService } from '../../../services/photos-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-photos',
  imports: [RouterLink],
  templateUrl: './photos.html',
  styleUrl: './photos.scss',
})
export class Photos {
  private readonly photosService = inject(PhotosService);
  readonly id = input.required<string>();

  private albumDetails = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.photosService.getPhotos(id))),
  );

  protected photos = computed(() => this.albumDetails()?.photos ?? []);

  protected albumTitle = computed(() => this.albumDetails()?.albumTitle ?? 'Carregando álbum...');
}
