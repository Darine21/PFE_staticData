import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

//import { StaticService } from '../static.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StaticData } from '../../models/staticdata';
import { StaticService } from '../../static/static.service';
import { DataService } from '../../static/data.service';



@Component({
  selector: 'app-dialog-e',
  templateUrl: './dialog-e.component.html',
  styleUrls: ['./dialog-e.component.scss']
})
export class DialogEComponent implements OnInit {


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
  singleValue: string = '';
  Data: any[] = [];
  dataSuccess: boolean;
    formDataListSubscription: any;
    
    formDataaddress: any;
    formDataResponsible: string;
    CreateDate: String;
    formDatanum: number;
  constructor(private staticService: StaticService, private fb: FormBuilder, private toastr: ToastrService, private dataService: DataService) {

  }
  formDataName: string;
  formDataCategory: string;
  formDataTypes: string;
  formDataStatus: string;
  formDataId: number;
  formDataCreateDate: string;
  formDataCreatedBy: string;
  showDeleteButton: Boolean = false;
  showShareOptions: boolean = false;
  formvalues: string[] = [];
  selectedItemName: string = '';
  selectedVersion: number;
  submittedDataList: any[] = [];
  selectedItemID: number
  values: string;
  ngOnInit() {
    this.selectedItemID = this.dataService.getSelectedItemID();
    console.log('selectedItemID:', this.selectedItemID);
    this.formDataListSubscription = this.dataService.formDataList2$.subscribe(formDataList => {
      //this.formDataList = formDataList;
      if (formDataList) {
        console.log('Données reçues dans StaticComponent :', formDataList);
        console.log("elt", formDataList[this.selectedItemID - 1].responsible)
        this.formDataName = formDataList[this.selectedItemID - 1].name;
        console.log("bellah", this.formDataName);
        this.formDataResponsible = formDataList[this.selectedItemID - 1].responsible;
        this.formDataaddress = formDataList[this.selectedItemID - 1].address;
        this.formDataStatus = formDataList[this.selectedItemID - 1].status;
        this.formDatanum = formDataList[this.selectedItemID - 1].phoneNumber;
        this.CreateDate = formDataList[this.selectedItemID - 1].dateCreated;
        this.formDataCreatedBy = formDataList[this.selectedItemID - 1].descreption;
        this.showDeleteButton = true;
      }
});

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
    if (this.selectedOption === 'single') {
      const data = this.Data = [...this.inputValues];
      formData.null = data;
      console.log("hhhh", formData.null)
    } else {
      const valuesArray = this.bulkValues.split(/\r?\n/);
      formData.null = this.addedBulkValues = [...valuesArray];
      console.log("val2", this.addedBulkValues);
    }
    console.log("back", formData);
    const staticData: StaticData = {
      Name: formData.Name,
      Types: formData.Types,
      Category: formData.Category,
      Status: 'Inactive/Draft', // Assurez-vous de donner le statut approprié
      DateCreated: new Date(), // Ajoutez la date de création actuelle
      CreatedBy: 'username',
      InputValues: formData.null
    };

    this.staticService.Addition(staticData).subscribe({
      next: (response) => {

        console.log("Response from API:", response);

        this.toastr.success('Data added successfully!', 'Success');
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

    this.dataService.updateFormData(filteredFormData);
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

  addInput() {
    if (this.selectedOption === 'single') {
      this.inputValues.push('');



    }
  }
  updateInputValue(index: number, value: string) {
    this.inputValues[index] = value;
    // Mettre à jour formData ici si nécessaire
  }

  removeInput(index: number) {
    if (this.selectedOption === 'single') {
      this.inputValues.splice(index, 1);
      console.log("Valeurs saisies par l'utilisateur:", this.inputValues);
    }
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

