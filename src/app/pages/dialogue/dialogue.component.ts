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

  onNext() {
    this.showFirstDialog = false;
    this.showSecondDialog = true;
  }

  onBack() {
    this.showFirstDialog = true;
    this.showSecondDialog = false;
  }

  onClose() {
    // Réinitialise les valeurs et cache les deux dialogues
    this.dataName = '';
    this.showFirstDialog = false;
    this.showSecondDialog = false;
  }

  onCreate() {
    // Placez votre logique de création ici
    console.log('Creating data:', this.dataName);
    this.onClose(); // Ferme le dialogue après la création
  }

  addInput(index: number) {
    this.inputValues.splice(index + 1, 0, ''); // Ajouter un champ d'entrée vide après l'index spécifié
  }

  removeInput(index: number) {
    this.inputValues.splice(index, 1); // Supprimer le champ d'entrée à l'index spécifié
  }


  ngOnInit(): void {
  }

}



