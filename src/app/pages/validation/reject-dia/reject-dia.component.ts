import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-reject-dia',
  templateUrl: './reject-dia.component.html',
  styleUrls: ['./reject-dia.component.scss']
})
export class RejectDiaComponent implements OnInit {
  showFirstDialog: boolean = true;
  showSecondDialog: boolean = false;
  dataName: string = '';
  inputValues: string[] = [''];
  showRejectDialog: boolean = false;
  showCreateButton: boolean = true; // Contrôle la visibilité du bouton Create
  showExportButton: boolean = true; // Contrôle la visibilité du bouton Export
  items: any[] = [
    {
      id: 1,
      name: "Example 1",
      status: "Inactive",
      category: "Category 1",
      types: ["global"],
      createDate: "2022-04-20",
      createdBy: "User 1",
      checked: false // Ajoutez une propriété pour la case à cocher
    },
    {
      id: 2,
      name: "Example 2",
      status: "Inactive",
      category: "Category 2",
      types: ["global"],
      createDate: "2022-04-21",
      createdBy: "User 2",
      checked: false // Ajoutez une propriété pour la case à cocher
    },
    // Ajoutez plus d'exemples si nécessaire
  ];

  onNext() {
    this.showFirstDialog = false;
    this.showSecondDialog = true;
  }
  @Output() statusUpdate: EventEmitter<string> = new EventEmitter<string>();

  openSecondDialog() {
    // Autres logiques nécessaires
    this.statusUpdate.emit('Rejected');
  } onYesClick(): void {
    // Émettre l'événement avec la nouvelle valeur de status
    this.statusUpdate.emit('Rejected');
  }


  onClose() {
    // Réinitialise les valeurs et cache les deux dialogues
    this.dataName = '';
    this.showFirstDialog = false;
    this.showSecondDialog = false;
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
