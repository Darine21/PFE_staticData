import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable();
  private notificationSubject1 = new Subject<string>();
  notification1$ = this.notificationSubject1.asObservable();
  private notificationSubject2 = new Subject<string>();
  notification2$ = this.notificationSubject2.asObservable();
  show(message: string) {
    console.log('Notification Service: Emitting message', message); // Ajoutez ceci pour déboguer

    this.notificationSubject.next(message);
  }
  show1(message: string) {
    console.log('Notification Service: Emitting message', message); // Ajoutez ceci pour déboguer

    this.notificationSubject1.next(message);
  }
  show2(message: string) {
    console.log('Notification Service: Emitting message', message); // Ajoutez ceci pour déboguer

    this.notificationSubject2.next(message);
  }
}
