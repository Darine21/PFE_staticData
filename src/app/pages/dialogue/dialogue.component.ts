import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent implements OnInit {
  dataName: string;
  constructor(public dialogRef: MatDialogRef<DialogueComponent>) { }

  onClose(): void {
    this.dialogRef.close();
  }

  // Méthode pour gérer la création de données
  createData(dataName: string): void {
    // Logique pour créer la donnée avec le nom saisi
    console.log('Creating data with name:', dataName);
    this.onClose(); // Fermer la boîte de dialogue après la création des données
  }


  ngOnInit(): void {
  }

}



