import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

//import { StaticService } from '../static.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StaticData } from '../../models/staticdata';
import { StaticService } from '../../static/static.service';
import { DataService } from '../../static/data.service';
import { ValidService } from '../../validation/validation.service';
import { Entity } from '../../models/Entity';



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
  constructor(private staticService: StaticService, private fb: FormBuilder, private toastr: ToastrService, private dataService: DataService, private validService: ValidService) {

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
  formDataList2: any[];
  oldName: string;
  oldRes: string;
  oldAdd: string;
  oldS: string;
  oldN: number;
  oldDate: String;
  oldDes: string;


  ngOnInit() {
    this.selectedItemID = this.dataService.getSelectedItemID();
    console.log('selectedItemID:', this.selectedItemID);
    this.formDataListSubscription = this.dataService.formDataList2$.subscribe(formDataList => {
      this.formDataList2 = formDataList;
      if (formDataList) {
        console.log('Données reçues dans StaticComponent :', formDataList);
        
        this.formDataName = formDataList[this.selectedItemID - 1].name;
        this.oldName = formDataList[this.selectedItemID - 1].name;
        console.log("bellah", this.formDataName);
        this.formDataResponsible = formDataList[this.selectedItemID - 1].responsible;
        this.oldRes = formDataList[this.selectedItemID - 1].responsible;
        this.formDataaddress = formDataList[this.selectedItemID - 1].address;
        this.oldAdd = formDataList[this.selectedItemID - 1].address
        this.formDataStatus = formDataList[this.selectedItemID - 1].status;
        this.oldS = formDataList[this.selectedItemID - 1].status;
        this.formDatanum = formDataList[this.selectedItemID - 1].phoneNumber;
        this.oldN = formDataList[this.selectedItemID - 1].phoneNumber;
        this.CreateDate = formDataList[this.selectedItemID - 1].dateCreated;
        this.oldDate = formDataList[this.selectedItemID - 1].dateCreated;
        this.formDataCreatedBy = formDataList[this.selectedItemID - 1].descreption;
        this.oldDes = formDataList[this.selectedItemID - 1].descreption;
        this.showDeleteButton = true;
      }
});

  }
  isAddressEditable = false;

  // Méthode pour activer ou désactiver le mode édition de l'Address
  toggleAddressEdit() {
    this.isAddressEditable = !this.isAddressEditable;
  }
 

  onNext() {
    this.showFirstDialog = false;
    this.showSecondDialog = true;
  }
  selectedOption: string = ''; // Déclarez une propriété pour stocker l'option sélectionnée



 


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
  isEditingAddress = false;
  editedAddress: string;
  isEditingName = false;
  editedName: string;
  editedDescrption: string;
  startEditingName() {
    this.isEditingName = true;
    this.editedName = this.formDataList2[this.selectedItemID - 1].name;

    console.log("save", this.editedName);
    
  }
  isEditingDescription = false;
  saveEditedName() {
    this.formDataList2[this.selectedItemID - 1].name = this.editedName;
    this.formDataName = this.formDataList2[this.selectedItemID - 1].name,
   
    this.isEditingName = false;
    console.log("save1", this.formDataList2[this.selectedItemID - 1].name);
  }
  startEditingDescription() {
    this.isEditingDescription = true;
    this.editedDescrption = this.formDataList2[this.selectedItemID - 1].descreption;
    console.log("save", this.editedDescrption);
  }
  saveEditedDescription() {
    this.formDataList2[this.selectedItemID - 1].descreption = this.editedDescrption;
    this.formDataCreatedBy = this.formDataList2[this.selectedItemID - 1].descreption,
      this.isEditingDescription = false;
    console.log("save1", this.formDataList2[this.selectedItemID - 1].descreption);
  }
  isEditingResponsible = false;
  editedResponsible :string;
  startEditingResponsible() {
    this.isEditingResponsible = true;
    this.editedResponsible = this.formDataList2[this.selectedItemID - 1].responsible;
    //console.log("save", this.editedStatus);
  }
  saveEditedResponsible() {
    this.formDataList2[this.selectedItemID - 1].responsible = this.editedResponsible;
    this.formDataResponsible = this.formDataList2[this.selectedItemID - 1].responsible,
      this.isEditingResponsible = false;
    console.log("save1", this.formDataList2[this.selectedItemID - 1].responsible);
  }
  isEditingStatus = false;
  editedStatus: string;
  startEditingStatus() {
    this.isEditingStatus = true;
    this.editedStatus = this.formDataList2[this.selectedItemID - 1].status;
    console.log("save", this.editedStatus);
  }
  saveEditedStatus() {
    this.formDataList2[this.selectedItemID - 1].status = this.editedStatus;
    this.formDataStatus = this.formDataList2[this.selectedItemID - 1].status,
      this.isEditingStatus = false;
    console.log("save1", this.formDataList2[this.selectedItemID - 1].status);
  }

  isEditingnum = false;
  editednum: number;
  startEditingNum() {
    this.isEditingnum = true;
    this.editednum = this.formDataList2[this.selectedItemID - 1].phoneNumber;
    console.log("save", this.editednum);
  }
  saveEditedNum() {
    this.formDataList2[this.selectedItemID - 1].phoneNumber = this.editednum;
    this.formDatanum = this.formDataList2[this.selectedItemID - 1].phoneNumber,
      this.isEditingnum = false;
    console.log("save1", this.formDataList2[this.selectedItemID - 1].phoneNumber);
  }

 




  startEditingAddress() {
    this.isEditingAddress = true;
    this.editedAddress = this.formDataList2[this.selectedItemID - 1].address;
    console.log("save", this.editedAddress);
  }


  saveEditedAddress() {
    this.formDataList2[this.selectedItemID - 1].address = this.editedAddress;
    this.formDataaddress = this.formDataList2[this.selectedItemID - 1].address,
    this.isEditingAddress = false;
    console.log("save1", this.formDataList2[this.selectedItemID - 1].address);
  }

 

  // Déclarez les fonctions pour enregistrer les modifications
  newName: string;
  newS: string;
  newR: string;
  newA: string;
  newD: string;
  newN: number;
  saveChanges() {
    if (this.formDataName == undefined) {
      this.newName = this.oldName;
      console.log("apres", this.newName);
    } else {
      this.newName = this.formDataName;
      console.log("apres", this.newName);
    };
    if (this.formDataStatus == undefined) {
      this.newS = this.oldS;
      console.log("apres", this.newS);
    } else {
      this.newS = this.formDataStatus;
      console.log("apres", this.newS);
    };
    if (this.formDataaddress == undefined) {
      this.newA = this.oldAdd;
      console.log("apres", this.newA);
    } else {
      this.newA = this.formDataaddress;
      console.log("apres", this.newA);
    };
    if (this.formDataResponsible == undefined) {
      this.newR = this.oldRes;
      console.log("apres", this.newR);
    } else {
      this.newR = this.formDataResponsible;
      console.log("apres", this.newR);
    };
    if (this.formDataCreatedBy == undefined) {
      this.newD = this.oldDes;
      console.log("apres", this.newD);
    } else {
      this.newD = this.formDataCreatedBy;
      console.log("apres", this.newD);
    };
    if (this.formDatanum == undefined) {
      this.newN = this.oldN;
      console.log("apres", this.newN);
    } else {
      this.newN = this.formDatanum;
      console.log("apres", this.newN);
    };
    const Datee = this.CreateDate;


    this.showFirstDialog = false;
    this.showSecondDialog = false;
   

    console.log("old", this.oldName);

    const entityE: Entity = {
      name: this.newName,
      descreption: this.newD,
      status: this.newD,
      responsible: this.newR,
      address: this.newA,
      dateCreated: Datee,
      phoneNumber: this.newN

    }
    this.validService.UpdateEntity(this.oldName, entityE).subscribe(
      (response) => {
        console.log('update successful:', response);
        
      

      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
  }
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


