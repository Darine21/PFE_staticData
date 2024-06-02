import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <div *ngIf="show" class="confirmation-dialog" style="text-align:center; position: absolute;">
      <p style="text-align:center; font-family: cursive; margin-top:10px; color:#00484f; font-size:22px;">Are you sure you want to delete this data?</p>
      <button class="btn btn-outline-success" (click)="confirm(true)">Yes</button>
      <button type="button" class="btn btn-outline-danger" data-mdb-ripple-init data-mdb-ripple-color="dark" (click)="Noconfirm()">No</button>
    </div>
  `,
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  constructor(private dataService: DataService) { }
  show: boolean = true; // Initialisez show à true par défaut

  confirm(value: boolean) {
    this.dataService.confirm(value);
    this.closeDialog(); // Appeler la méthode pour fermer la boîte de dialogue
  }

  Noconfirm() {
    this.closeDialog(); // Appeler la méthode pour fermer la boîte de dialogue
  }

  private closeDialog() {
    this.show = false; // Masquer le dialogue en définissant show sur false
  }
}
