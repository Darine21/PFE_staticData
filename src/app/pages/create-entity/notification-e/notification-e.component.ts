import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../static/details/notification.service';

@Component({
  selector: 'app-notification-e',
  
  templateUrl: './notification-e.component.html',
  styleUrls: ['./notification-e.component.scss']
})
export class NotificationEComponent implements OnInit {

  message: string;
  show: boolean = false;

  constructor(private notificationService: NotificationService) {
    console.log('Notification Component: Constructor called'); // Pour déboguer
  }

  ngOnInit(): void {
    console.log('Notification Component: ngOnInit called'); // Pour déboguer
    this.notificationService.notification2$.subscribe(message => {
      console.log('Notification Component: Received message', message); // Pour déboguer
      this.message = message;
      this.show = true;
      setTimeout(() => this.show = false, 3000);
    });
  }
}
