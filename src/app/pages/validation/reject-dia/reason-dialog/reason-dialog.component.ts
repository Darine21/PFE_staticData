import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NavbarService } from '../../../../components/NavBar.service';
import { DataService } from '../../../static/data.service';


@Component({
  selector: 'app-reason-dialog',
  templateUrl: './reason-dialog.component.html',
  styleUrls: ['./reason-dialog.component.scss']
})
export class ReasonDialogComponent implements OnInit {

  reason: string = '';
   submittedDataList: any[]=[];

  constructor(public modal: NgbActiveModal, private navbarService: NavbarService, private dataService: DataService) { }
  reasons: string[] = [];

  saveReason() {
   
    console.log('Reason:', this.reason);
    // Envoyer le reason au service ou faire d'autres traitements
    this.modal.close(this.reason);
  }

 

  closeDialog() {
    this.modal.dismiss();
  }

  ngOnInit(): void {
  }

}
