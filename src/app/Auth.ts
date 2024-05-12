import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public authToken$: Observable<string | null> = this.authTokenSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('api/login', { username, password }).pipe(
      tap(response => {
        if (response && response.token) {
          this.setAuthToken(response.token);
        }
      })
    );
  }

  setAuthToken(token: string | null): void {
    localStorage.setItem('authToken', token);
    this.authTokenSubject.next(token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authTokenSubject.next(null);
  }

}
