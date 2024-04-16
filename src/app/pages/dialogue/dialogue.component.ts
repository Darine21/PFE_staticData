import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogsComponent {
  showFirstDialog: boolean = true;
  showSecondDialog: boolean = false;
  dataName: string = '';
  inputValues: string[] = [''];
  showCreateButton: boolean = true; // Contrôle la visibilité du bouton Create
  showExportButton: boolean = true; // Contrôle la visibilité du bouton Export


  onNext() {
    this.showFirstDialog = false;
    this.showSecondDialog = true;
  }

  

  onClose() {
    // Réinitialise les valeurs et cache les deux dialogues
    this.dataName = '';
    this.showFirstDialog = false;
    this.showSecondDialog = false;
  }
  openSecondDialog() {
    this.showFirstDialog = false; // Masquer la première boîte de dialogue
 // Masquer le bouton Create
    this.showExportButton = true; // Masquer le bouton Export
    this.showSecondDialog = true; // Afficher la deuxième boîte de dialogue
  }

  onBack() {
    this.showSecondDialog = false; // Masquer la deuxième boîte de dialogue
     // Afficher le bouton Create
    this.showExportButton = false; // Afficher le bouton Export
    this.showFirstDialog = true; // Afficher la première boîte de dialogue
  }



 

  addInput(index: number) {
    this.inputValues.splice(index + 1, 0, ''); // Ajouter un champ d'entrée vide après l'index spécifié
  }

  removeInput(index: number) {
    this.inputValues.splice(index, 1); // Supprimer le champ d'entrée à l'index spécifié
  }
  exportToExcel() {
    // Simuler un clic sur l'élément input caché pour que l'utilisateur puisse choisir un emplacement de fichier
    document.getElementById('fileInput').click();
  }

  onFileChosen(event: any) {
    const selectedFile = event.target.files[0];
    // Ici, vous pouvez générer le fichier Excel et l'enregistrer à l'emplacement choisi par l'utilisateur
  }



  ngOnInit(): void {
  }

}



