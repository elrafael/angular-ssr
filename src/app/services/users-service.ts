import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly api = '/api/users';
  private readonly http = inject(HttpClient);

  getUser(id: string) {
    return this.http.get<User>(`${this.api}/${id}`);
  }
}
