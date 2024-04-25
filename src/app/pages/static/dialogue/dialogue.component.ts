import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StaticData } from '../../models/staticdata';
import { StaticService } from '../static.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  inputMethod: string;

  @Output() addItem = new EventEmitter<any>();
  @Output() dataSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() formSubmitted = new EventEmitter<any>();
  myForm: FormGroup;
  errorMessages: any;

  constructor(private dialogue: StaticService, private fb: FormBuilder, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.resetForm();
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
    if (this.dialogue.formData.Id == 0)
      this.insertRecord(form);
   
  }

  insertRecord(form: NgForm) {
    this.dialogue.addStaticData().subscribe(
      res => {
        debugger;
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Payment Detail Register');
        this.dialogue.refreshList();
      },
      err => {
        debugger;
        console.log(err);
      }
    )
  }





  // Fonction pour réinitialiser les valeurs du formulaire
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.dialogue.formData = {
      Id: 0,
      Name: '',
      Types: '',
      Category: '',
      Status: 'Inactive',
      CreatedBy: '',
      DateCreated: new Date()
    



    }
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

