import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, delay, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RateLimiterService {
  private requestQueue = new Subject<() => Observable<any>>();
  private maxRequests = 8;
  private interval = 60000 / this.maxRequests;
  private currentRequests = 0;

  constructor(private http: HttpClient) {
    this.processQueue();
  }

  private processQueue(): void {
    this.requestQueue.pipe(
      mergeMap(request => {
        if (this.currentRequests >= this.maxRequests) {
          return of(null).pipe(delay(this.interval / 2)); // Réduire l'intervalle pour vérifier plus fréquemment
        } else {
          this.currentRequests++;
          return request().pipe(
            catchError(error => {
              this.currentRequests--;
              return of(null);
            })
          );
        }
      })
    ).subscribe();
  }

  public addRequest(requestFn: () => Observable<any>): Observable<any> {
    const subject = new Subject<any>();
    this.requestQueue.next(() => requestFn().pipe(
      mergeMap(response => {
        this.currentRequests--;
        subject.next(response);
        subject.complete();
        return of(response);
      }),
      catchError(error => {
        this.currentRequests--;
        subject.error(error);
        return of(null);
      })
    ));
    return subject.asObservable();
  }
}
