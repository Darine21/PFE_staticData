import { Component } from '@angular/core';
import { NotificationService } from '../../../static/details/notification.service';

@Component({
  selector: 'app-notification-s',
 
  templateUrl: './notification-s.component.html',
  styleUrls: ['./notification-s.component.scss']
})
export class NotificationSComponent {
  message: string;
  show: boolean = false;

  constructor(private notificationService: NotificationService) {
    console.log('Notification Component: Constructor called'); // Pour déboguer
  }

  ngOnInit(): void {
    console.log('Notification Component: ngOnInit called'); // Pour déboguer
    this.notificationService.notification1$
      .subscribe(message => {
      console.log('Notification Component: Received message', message); // Pour déboguer
      this.message = message;
   
      setTimeout(() => this.show = false, 3000);
    });
  }
}
