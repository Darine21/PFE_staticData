import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register';
import { environment } from '../../../environments/environement.developement';
import { Login } from '../models/login';
import { User } from '../models/user';
import { ReplaySubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  refreshUser(jwt: string | null) {
    if (jwt == null) {
      this.userSource.next(null);
      return of(undefined);
    }
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);
    return this.http.get<User>(`${environment.appUrl}/api/account/refresh-user-token`, { headers }).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    );
  }

  login(model: Login) {
    return this.http.post<User>(`${environment.appUrl}/api/pages/account/login`, model);
  }

  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigate(['/']);
  }

  register(model: Register) {
    return this.http.post(`${environment.appUrl}/api/pages/account/register`, model);
  }

  getJWT() {
    if (typeof localStorage !== 'undefined') {
      const key = localStorage.getItem(environment.userKey);
      if (key) {
        const user: User = JSON.parse(key);
        return user.jwt;
      }
    }
    return null;
  }


  private setUser(user: User) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }
}
