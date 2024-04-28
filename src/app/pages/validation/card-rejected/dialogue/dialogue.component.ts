import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
})
export class CommentDialogComponent {
  showDialog: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }
  onClose(){
    this.router.navigate(['/rejected']);// Masquer le dialogue en affectant false à la variable showDialog
  }
}
