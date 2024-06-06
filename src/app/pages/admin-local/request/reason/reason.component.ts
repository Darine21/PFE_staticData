import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NavbarService } from '../../../../components/NavBar.service';
import { DataService } from '../../../static/data.service';
import { Router } from '@angular/router';
import { NotificationComponent } from '../../../static/details/notification/notification.component';
import { NotificationService } from '../../../static/details/notification.service';

@Component({
  selector: 'app-reason',
 
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss']
})
export class ReasonComponent {
  show: boolean = false;
  reason: string = '';
  submittedDataList: any[] = [];

  constructor(private notificationService: NotificationService, public modal: NgbActiveModal, private navbarService: NavbarService, private dataService: DataService, private router: Router) { }
  reasons: string[] = [];

  saveReason() {

    console.log('Reason:', this.reason);

    this.modal.close(this.reason);
    this.dataService.setMessage(this.reason);
    this.notificationService.show('request sent');

    this.show = false
    this.router.navigate(['/local-user'])
  }



  closeDialog() {
    this.modal.dismiss();
    this.show = false;
  }

  ngOnInit(): void {
  }
}
