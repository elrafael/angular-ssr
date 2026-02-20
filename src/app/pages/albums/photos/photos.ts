import { Component, inject, input, signal } from '@angular/core';
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
  readonly id = input.required<string>(); // Se usares withComponentInputBinding()
  protected photos = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.photosService.getPhotos(id))),
  );

  readonly albumTitle = signal<string>('Carregando álbum...');
}
