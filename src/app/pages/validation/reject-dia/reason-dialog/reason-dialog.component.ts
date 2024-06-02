import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NavbarService } from '../../../../components/NavBar.service';
import { DataService } from '../../../static/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reason-dialog',
  templateUrl: './reason-dialog.component.html',
  styleUrls: ['./reason-dialog.component.scss']
})
export class ReasonDialogComponent implements OnInit {
  show: boolean = false;
  reason: string = '';
   submittedDataList: any[]=[];

  constructor(public modal: NgbActiveModal, private navbarService: NavbarService, private dataService: DataService, private router: Router) { }
  reasons: string[] = [];

  saveReason() {
   
    console.log('Reason:', this.reason);
   
    this.modal.close(this.reason);

    this.show = false
    this.router.navigate(['/valide'])
  }

 

  closeDialog() {
    this.modal.dismiss();
    this.show = false;
  }

  ngOnInit(): void {
  }

}
