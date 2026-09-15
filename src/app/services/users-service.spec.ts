import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from './users-service';
import { User } from '../shared/interfaces/user';
import { firstValueFrom } from 'rxjs';
import type { HttpErrorResponse } from '@angular/common/http';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUser should perform GET and return a user', async () => {
    const mockUser: User = {
      id: 1,
      name: 'Alice',
      username: 'alice',
      email: 'alice@example.com',
      address: {
        street: 'Main',
        suite: 'Apt. 1',
        city: 'Townsville',
        zipcode: '12345',
        geo: { lat: '0', lng: '0' },
      },
      phone: '555-1234',
      website: 'example.com',
      company: { name: 'Acme', catchPhrase: 'We deliver', bs: 'business' },
    };

    const obs = service.getUser('1');
    const promise = firstValueFrom(obs);
    const req = httpMock.expectOne('/api/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
    const user = await promise;
    expect(user).toEqual(mockUser);
  });

  it('getAllUsers should perform GET and return array of users', async () => {
    const users: User[] = [
      {
        id: 1,
        name: 'Alice',
        username: 'alice',
        email: 'alice@example.com',
        address: {
          street: 'Main',
          suite: 'Apt. 1',
          city: 'Townsville',
          zipcode: '12345',
          geo: { lat: '0', lng: '0' },
        },
        phone: '555-1234',
        website: 'example.com',
        company: { name: 'Acme', catchPhrase: 'We deliver', bs: 'business' },
      },
    ];

    const obs = service.getAllUsers();
    const promise = firstValueFrom(obs);
    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(users);
    const res = await promise;
    expect(res).toEqual(users);
  });

  it('getUser should propagate HTTP errors', async () => {
    const obs = service.getUser('999');
    const promise = firstValueFrom(obs);
    const req = httpMock.expectOne('/api/users/999');
    req.flush({ message: 'Not found' }, { status: 404, statusText: 'Not Found' });
    try {
      await promise;
      throw new Error('expected an error');
    } catch (err: unknown) {
      const httpErr = err as HttpErrorResponse;
      expect(httpErr.status).toBe(404);
    }
  });
});
