import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  message: string;
  show: boolean = false;

  constructor(private notificationService: NotificationService) {
    console.log('Notification Component: Constructor called'); // Pour déboguer
  }

  ngOnInit(): void {
    console.log('Notification Component: ngOnInit called'); // Pour déboguer
    this.notificationService.notification$.subscribe(message => {
      console.log('Notification Component: Received message', message); // Pour déboguer
      this.message = message;
      this.show = true;
      setTimeout(() => this.show = false, 3000);
    });
  }
}
