import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
})
export class CommentDialogComponent {
  showDialog: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialogRef: MatDialogRef<CommentDialogComponent>) { }
  showCommentDialog: boolean = false; // Propriété pour contrôler l'affichage de la boîte de dialogue de commentaire

  onClose() {
    console.log("Fermeture de la boîte de dialogue de commentaire.");
    this.dialogRef.close(); // Fermez la boîte de dialogue en appelant la méthode close de MatDialogRef
  }
}
