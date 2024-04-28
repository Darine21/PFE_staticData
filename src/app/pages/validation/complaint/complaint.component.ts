import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message/message.component';
declare var bootstrap: any;

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openMessageDialog(): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: { message: 'Bonjour, comment puis-je vous aider ?' } // Message par défaut
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('La réponse est : ', result);
      // Envoyer la réponse à votre logique métier ici
    });
  }
    ngOnInit(): void {
       
    }



  
  
  sendMessage() {
    var messageContent = (<HTMLInputElement>document.getElementById('messageContent')).value;
    console.log('Message envoyé :', messageContent);
    var messageModal = document.getElementById('messageModal');
    var modal = new bootstrap.Modal(messageModal);
    modal.hide();
  }
 
 
 
}
