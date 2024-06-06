import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

//import { StaticService } from '../static.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../static/data.service';
import { StaticService } from '../../static/static.service';
import { TranslationService } from '../../static/details/Translate.service';
import { Router } from '@angular/router';
import { DialogsComponent } from '../../static/dialogue/dialogue.component';
import { EntityLocal } from '../../models/EntityLocal';
@Component({
  selector: 'app-dialog-spec',
  templateUrl: './dialog-spec.component.html',
  styleUrls: ['./dialog-spec.component.scss']
})
export class DialogSpecComponent implements OnInit {
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
  singleValue: string = '';
  Data: any[] = [];
  dataSuccess: boolean;
  constructor(private dialogRef: MatDialogRef<DialogsComponent>, private router: Router, private cd: ChangeDetectorRef, private translationService: TranslationService, private staticService: StaticService, private fb: FormBuilder, private toastr: ToastrService, private dataService: DataService) {

  }

  val: string[] = [];
  // Méthode pour ajouter un nouveau champ d'entrée
  addInput(index: number, name: string) {
    console.log("val", this.inputValues);
    console.log("val0", this.inputValues[0]);
    this.inputValues.splice(index + 1, 0, '');
    console.log("NN", name);
    this.val.push(name);
    console.log("eee", this.val);
  }

  ngOnInit() {
  }
  preventSubmit(event: Event) {
    event.preventDefault();
  }
  onNext() {
    this.showFirstDialog = false;
    this.showSecondDialog = true;
  }
  selectedOption: string = ''; // Déclarez une propriété pour stocker l'option sélectionnée

  updateSelectedOption(option: string) {
    this.selectedOption = option;
  }
  showbulk: boolean = false;

  addBulkValues() {
    this.showbulk = true
    const valuesArray = this.bulkValues.split(/\r?\n/);
    this.addedBulkValues = [...valuesArray];
    console.log("val", this.addedBulkValues);
  }
  onSubmit(form: NgForm) {
    const formData = form.value;
   
    console.log("eeeeee", formData);
    this.inputValues = this.copylist
    formData.inputValues = [...this.inputValues, ...(this.bulkValues ? this.bulkValues.split(/\r?\n/) : [])];
    console.log("back", formData);
    const val = `Local`
    const staticData: EntityLocal = {
      Name: formData.Name,
      Types: formData.Types,
      Category: formData.Category,
      Status: 'Inactive/Draft', // Assurez-vous de donner le statut approprié
      DateCreated: new Date().toLocaleDateString('fr-FR', {
        hour12: false,
        timeZone: 'UTC'
      }), 
      CreatedBy:val ,
      inputValues: formData.inputValues
    };
    console.log(formData.Name);
    this.staticService.AdditionE(formData.Name,staticData).subscribe({
      next: (response) => {

        console.log("Response from API:", response);

        this.toastr.success('Data added successfully!', 'Success');
        this.dialogRef.close();
      },
      error: (error) => {

        console.error("Error adding data:", error);

        this.toastr.error('Failed to add data!', 'Error');
      }
    });
    const filteredFormData = {};
    for (const key in formData) {
      if (formData[key] !== null) {
        filteredFormData[key] = formData[key];
      }
    }

    console.log("ttt", filteredFormData);
    const id = filteredFormData
    this.dataService.updateFormData1(filteredFormData);
   
    this.showFirstDialog = false;
    // Masquer le bouton Create
    this.showExportButton = true;
    this.showSecondDialog = true;
  }

  addSingleValue() {
    if (this.singleValue) {
      this.addedBulkValues.push(this.singleValue);
      this.singleValue = '';
    }
  }
  toggleOptions(index: number): void {
    this.showOptions[index] = !this.showOptions[index];
  }

  showOptions: boolean[] = [];
  translatedValues: { [key: string]: string[] } = {};
  selectedLanguage: string[] = [];
  translations: { [key: number]: { [key: string]: string } } = {};
  selectedLanguages: string[] = [];
  showFirstDialog: boolean = true;
  translateAllTexts(language: string) {
    this.inputValues.forEach((value, index) => {
      this.translateText(value, 'en', language, index);
    });

  }

  translateText(name: string, source: string, target: string, index: number) {
    this.translationService.translate(name, source, target).subscribe(
      (response: any) => {
        if (response && response.trans) {
          if (!this.translations[index]) {
            this.translations[index] = {};
          }
          this.translations[index][target] = response.trans;

          if (!this.selectedLanguages.includes(target)) {
            this.selectedLanguages.push(target);
            console.log(this.selectedLanguages);
          }

          console.log("Traductions:", this.translations);
          this.cd.detectChanges();
        } else {
          console.error('Réponse de traduction incorrecte:', response);
        }
      },
      (error) => {
        console.error('Erreur de traduction:', error);
      }
    );
  }

  items: any[] = [];

  onDeleteRow(formDataId: number) {
    console.log('Deleting row with ID:', formDataId);
    console.log('Current items:', this.items);
    const index = this.items.findIndex(item => item.ID === formDataId);
    console.log('Index of element to delete:', index);
    if (index !== -1) {
      this.items.splice(index, 1);
    } else {
      console.error('Element not found');
    }
  }


  resetValues() {
    this.dataName = '';

    this.dataType = '';
    this.dataCategory = '';
    this.inputValues = [];
    this.singleValue = '';
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
    this.showFirstDialog = false;
    // Masquer le bouton Create
    this.showExportButton = true;
    this.showSecondDialog = true; // Afficher la deuxième boîte de dialogue
  }

  onBack() {
    this.showSecondDialog = false; // Masquer la deuxième boîte de dialogue
    // Afficher le bouton Create
    this.showExportButton = false; // Afficher le bouton Export
    this.showFirstDialog = true; // Afficher la première boîte de dialogue
  }




  copylist: string[] = [''];
  updateInputValue(newValue: string, index: number,) {
    //this.inputValues[index] = newValue;
    this.copylist[index] = newValue;


    console.log("ee", newValue);// Stocker la valeur saisie dans une variable du composant
  }
  // Mettre à jour formData ici si nécessaire


  removeInput(index: number) {
    console.log("Valeurs saisies par l'utilisateur1:", this.inputValues);
    this.inputValues.splice(index, 1);
    console.log("Valeurs saisies par l'utilisateur:", this.inputValues);

  }
  onInputChange(event: any) {

  }
  singleValues: string[] = [];




  exportToExcel() {

    document.getElementById('fileInput').click();
  }

  onFileChosen(event: any) {
    const selectedFile = event.target.files[0];
  }

  AddInput() {
    if (this.selectedOption === 'single') { // Vérifiez si vous avez atteint une limite (MAX_INPUTS) avant d'ajouter une nouvelle valeur
      this.inputValues.push('');
    }
  }



}

