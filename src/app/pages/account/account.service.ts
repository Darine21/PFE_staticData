import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environement.developement'; // Assurez-vous que le chemin est correct

export interface User {
  jwt: string;
  FirstName: string;
  LastName: string;
  RefreshToken: string;
  RefreshTokenExpiryTime: Date;
  role: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface Register {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService implements HttpInterceptor {
  private userSource = new BehaviorSubject<User | null>(null);
  user$ = this.userSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.getJWT();
    if (jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${ jwt }`        }
      });

     }
return next.handle(request);
  }

login(model: Login): Observable < User > {
  return this.http.post<User>(`${environment.appUrl }/api/pages/account/login`, model).pipe(
    tap(user => {
      if (user && user.jwt) {
        this.storeUser(user);
      }
    }),
    catchError(error => {
      console.error('Login error:', error);
      return throwError(error);
    })
  );
}

register(model: Register): Observable < User > {
  return this.http.post<User>(`${ environment.appUrl }/api/pages/account/register`, model).pipe(
    tap(user => {
      if (user && user.jwt) {
        this.storeUser(user);
      }
    }),
    catchError(error => {
      console.error('Registration error:', error);
      return throwError(error);
    })
  );
}

logout() {
  this.removeUser();
  this.router.navigate(['/login']);
}

  private storeUser(user: User) {
  localStorage.setItem('user', JSON.stringify(user));
  this.userSource.next(user);
}

  private removeUser() {
  localStorage.removeItem('user');
  this.userSource.next(null);
}

getJWT(): string | null {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).jwt : null;
}
}
