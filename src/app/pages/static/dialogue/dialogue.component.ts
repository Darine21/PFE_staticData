import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StaticData } from '../../models/staticdata';
//import { StaticService } from '../static.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

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
  bulkValues: string = ''; // Variable pour stocker les valeurs entrées en bloc
  addedBulkValues: string[] = [];
  dataType: string;
  dataCategory: string;
  
  inputMethod: string = '';
  @Output() addItem = new EventEmitter<any>();
  @Output() dataSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() formSubmitted = new EventEmitter<any>();
  myForm: FormGroup;
  errorMessages: any;
  formData: any[] = []; 

  constructor( private fb: FormBuilder, private toastr: ToastrService, private dataService: DataService) {

  }

  ngOnInit() {
    //this.resetForm();
   
      // Souscrire aux données partagées pour les mettre à jour dans le formulaire si nécessaire
      this.dataService.formData$.subscribe(formData => {
       
        this.formData = formData;
        console.log("datttt");// Assurez-vous de mettre à jour la variable formData avec les données partagées
      });
    
  }

  onNext() {
    this.showFirstDialog = false;
    this.showSecondDialog = true;
  }

  addBulkValues() {
    const valuesArray = this.bulkValues.split(/\r?\n/);
    this.addedBulkValues = [...valuesArray];
  }

  onSubmit(form: NgForm) {
    const formData = form.value;

    // Exclure les clés null du formulaire
    const filteredFormData = {};
    for (const key in formData) {
      if (formData[key] !== null) {
        filteredFormData[key] = formData[key];
      }
    }

    console.log("ttt",filteredFormData); // Affichez les données filtrées dans la console pour vérification
    this.dataService.updateFormData(filteredFormData); // Envoyer les données de formData au service partagé
  }





  // Fonction pour réinitialiser les valeurs
  resetValues() {
    this.dataName = '';
    
    this.dataType = '';
    this.dataCategory = '';
    this.inputValues = [''];
    this.bulkValues = '';
    this.addedBulkValues = [];
  }
  addBulkInput(index: number) {
    this.inputValues.splice(index + 1, 0, '')
  }

  removeBulkValue(index: number) {
    this.addedBulkValues.splice(index, 1);
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
  addInput() {
    if (this.inputMethod === 'single') {
      this.inputValues.push('');
    } else if (this.inputMethod === 'bulk') {
      this.addedBulkValues.push('');
    }
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




}

