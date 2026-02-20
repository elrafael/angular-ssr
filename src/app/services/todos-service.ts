import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '../shared/interfaces/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private readonly api = '/api/todos';
  private readonly http = inject(HttpClient);

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.api);
  }
}
