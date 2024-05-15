import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogsComponent } from '../dialogue/dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { CollapseModule } from 'ng-uikit-pro-standard';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { SelectedItemService } from '../../validation/communiation.service';
import { StaticData } from '../../models/staticdata';
//import { ShareDiaComponent } from '../share-dia/share-dia.component';
interface Version {
  id: number;
  // Autres propriétés de votre modèle de données...
  selectedItems: any[]; // Déclaration de la propriété selectedItems
}
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  data: any[] = [];
  filteredData: any[];
  isNavbarCollapsed = true;
  selectedNavItem: string | null = null;
  activeLineIndex: number = 0;
  selectedDate: string = '';
  creationDate: NgbDateStruct;
  showForm: boolean = true; // Pour afficher soit le formulaire, soit la table
  inputValues: string[] = []; // Tableau pour stocker les valeurs saisies
  isValuesSelected: boolean = false;
  showOptions: boolean[] = [];
  entitiesToShareWith: string[] = ['Entity 1', 'Entity 2', 'Entity 3'];
  //@ViewChild(ShareDiaComponent) multiselectComponent: ShareDiaComponent;
  // Définissez la liste des valeurs prédéfinies
  predefinedValues: string[] = ['Val1', 'Val2', 'Val3'];
  selectedValue: string = '';
  newValue: string = '';
  options: any;
  list: any[] = [];
    checked: boolean;
    selectedItemID: number;
  

  constructor(private route: ActivatedRoute ,private dialog: MatDialog, private router: Router, private dataService: DataService, private selectedItemService: SelectedItemService) { }
  checkAndAddValue() {
    // Vérifiez si la valeur saisie correspond à l'une des valeurs prédéfinies
    if (this.predefinedValues.includes(this.newValue)) {
      // Ajoutez la valeur saisie à la liste inputValues
      this.inputValues.push(this.newValue);
      // Réinitialisez la valeur saisie à une chaîne vide
      this.newValue = '';
    }
  }
  // Déclarez la variable newValue dans la classe de composant


  // Définissez la méthode addNewValue pour ajouter une nouvelle valeur
  addNewValue(value: string) {
    if (value.trim() !== '') {
      this.options.push(value);
      // Réinitialisez la valeur du champ de saisie
      this.newValue = '';
    }
  }
  naviguerVersValide() {
    this.router.navigate(['/valide']);
  }
  sharedEntities: string[] = [];
  addSelectedValue() {
    // Vérifiez si une valeur est sélectionnée
    if (this.selectedValue) {
      // Ajoutez la valeur sélectionnée à la liste inputValues
      this.inputValues.push(this.selectedValue);
      // Réinitialisez la valeur sélectionnée à une chaîne vide
      this.selectedValue = '';
    }
  }

  formDataName: string;
  formDataCategory: string;
  formDataTypes: string;
  formDataStatus: string;
  formDataId: number;
  formDataCreateDate: Date;
  formDataCreatedBy: string;
  showDeleteButton: Boolean = false;
  showShareOptions: boolean = false;
  formvalues: string[]=[];
  selectedItemName: string = '';
  selectedVersion: number;
  submittedDataList: any[] = [];
  values: string;
  items: any[] = [
    {
      id: 1,
      name: "new version",
      status: "Inactive",
      category: "Category 1",
      types: ["global"],
      createDate: "2022-04-20",
      createdBy: "User 1",
      checked: false
    }
  ];
  dataName: string = '';
  //isItemSelected: boolean = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  entities = [
    { id: 1, name: 'Entity 1', selected: false },
    { id: 2, name: 'Entity 2', selected: false },
    { id: 3, name: 'Entity 3', selected: false },
    // Ajoutez d'autres entités si nécessaire
  ];
  publishedVersions: Version[] = [];
  showStatusField: boolean = false;


  getselectedEntities(): string[] {
    return this.entities.filter(entity => entity.selected).map(entity => entity.name);
  }
  showShareField: boolean = true;
  isEditing: boolean = false; // 
  valider(item: any): void {
    // Activer le mode édition
    this.isEditing = true;

    // Afficher le champ Share
    this.showShareField = false;
    this.showStatusField = true;
    // Remplir le champ Share avec les entités sélectionnées
    this.selectedEntities = this.selectedItems.map(item => item.itemName);
  }

  selectedEntities: string[];
 

  // Mettez à jour selectedEntities chaque fois que selectedItems change
  updateSelectedEntities(): void {
    this.selectedEntities = this.selectedItems.map(item => item.itemName);
  }
 

  loadPublishedVersions(): void {
    // Simulons trois versions publiées avec des identifiants uniques
    for (let i = 1; i <= 3; i++) {
      this.publishedVersions.push({
        id: i,

        selectedItems: [] // Initialisation des entités sélectionnées à vide
      });
    }
  }

  formvaluesList: any[] = [];
  itemId: number;

  ngOnInit(): void {
   
      this.dataService.inputValues$.subscribe(values => {
        this.dialogInputValues = values;
      });
   
    this.selectedItemService.selectedItem$.subscribe(name => {
      this.selectedItemName = name; // Mettre à jour le selectedItemName lorsque des mises à jour sont émises
    });
    this.loadPublishedVersions();
    this.selectedItemService.selectedVersion$.subscribe((newVersion: any) => {
      this.selectedVersion = newVersion;
    });
    this.publishedVersions = this.selectedItemService.getPublishedVersions();
    this.inputValues.push(''); // Ajoute une valeur initiale vide
    this.showOptions.push(false);
    this.selectedItemID = this.dataService.getSelectedItemID();
    console.log('selectedItemID:', this.selectedItemID);
  
    this.dataService.formDataList$.subscribe(formDataList => {
      if (formDataList) {
        const storedData = localStorage.getItem('formDataList');
        console.log(storedData);
        if (storedData) {
          formDataList = JSON.parse(storedData);
        }
        console.log('Données reçues dans StaticComponent :', formDataList);
          this.formDataName = formDataList[this.selectedItemID-1].Name;
          console.log("bellah", this.formDataName);
          this.formDataCategory = formDataList[this.selectedItemID-1].Category;
          this.formDataTypes = formDataList[this.selectedItemID-1].Types;
          this.formDataStatus = 'Inactive/Draft';
          this.formDataId = 1;
        this.formDataCreateDate = new Date();
          this.formDataCreatedBy = 'name';
        this.showDeleteButton = true;
    
        this.formvalues = formDataList[this.selectedItemID - 1].InputValues;
       
        console.log("valuessss", this.formvalues);
        
          this.values = this.formvalues[this.selectedItemID -1 ];
          console.log("values", this.values);
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('formDataList', JSON.stringify(formDataList));
        });
          this.checked = false;
          console.log("showDeleteButton:", this.showDeleteButton);
        } else {
          console.log('Aucune donnée dans formData ou formData est null.');
        }
    // Initialise showOptions pour la première valeur
    });
   

    this.dropdownList = [
      { "id": 1, "itemName": "Entity 1" },
      { "id": 2, "itemName": "Entity 2" },
      { "id": 3, "itemName": "Entity 3" },
      { "id": 4, "itemName": "Entity 4" },
      { "id": 5, "itemName": "Entity 5" },
      { "id": 6, "itemName": "Entity 6" },
      { "id": 7, "itemName": "Entity 7" },
      { "id": 8, "itemName": "Entity 8" },
      { "id": 9, "itemName": "Entity 9" },
      { "id": 10, "itemName": "Entity 10" }
    ];
    this.selectedItems = [

    ];
    console.log("ssss");
    this.dropdownSettings = {
      
      text: "Select Entities",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
  }

  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }


 
  onItemSelect(item: any, version: Version) {
    if (!this.showShareField) {
      console.log(item);
      console.log(this.selectedItems);
      this.updateSelectedEntities();
      version.selectedItems.push(item);
      // Mettre à jour selectedEntities
    }
  }

  OnItemDeSelect(item: any, version: Version) {
    if (!this.showShareField) {
      console.log(item);
      console.log(this.selectedItems);
      this.updateSelectedEntities();
      version.selectedItems = version.selectedItems.filter(selectedItem => selectedItem !== item);
      // Mettre à jour selectedEntities
    }
  }


  dialogInputValues: string[] = [];

  receiveValuesFromDialog(values: string[]) {
    this.dialogInputValues = values;
  }

  updateSelectedVersion(version: string): void {
    this.selectedItemService.updateSelectedVersion(version);
  }

  updateSelectedItemName(name: string): void {
    this.selectedItemService.updateSelectedItem(name);
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Supprimer les espaces vides
    filterValue = filterValue.toLowerCase(); // Mettre en minuscule
    // Appliquer le filtre
    this.filteredData = this.data.filter(item => {
      // Filtrer en fonction du nom ou d'autres propriétés
      return item.name.toLowerCase().includes(filterValue);
    });
  }
  updateStatus(newStatus: string) {
    // Parcourir le tableau items
    this.items.forEach(item => {
      // Vérifier si l'élément correspond à celui rejeté
      if (item.status === "Inactive/Draft") {
        // Mettre à jour le statut de l'élément rejeté
        item.status = newStatus;
      }
    });
  }  
  shareOptions() {
    this.showShareOptions = !this.showShareOptions; // Bascule la valeur de showShareOptions
  }
 
  // Dans votre composant TypeScript
  toggleOptions(index: number): void {
    this.showOptions[index] = !this.showOptions[index];
  }

  // Tableau pour stocker les valeurs saisies

  // Méthode pour ajouter une nouvelle valeur
 
  addInput(index: number) {
    this.inputValues.splice(index + 1, 0, '');
    this.showOptions.splice(index + 1, 0, false); // Ajouter un champ d'entrée vide après l'index spécifié
  }

  // Méthode pour supprimer une valeur à l'index spécifié
  removeInput(index: number) {
    this.inputValues.splice(index, 1); // Supprimer le champ d'entrée à l'index spécifié
  }

  // Méthode pour partager la valeur à l'index spécifié
  
  

  isItemSelected(item: string): boolean {
    // Retourne true si l'élément spécifié est sélectionné, sinon false
    return item === 'Values' && this.isValuesSelected;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  toggleLine(itemId: string) {
    // Masquez toutes les lignes d'abord
    document.querySelectorAll('.line').forEach((line: HTMLElement) => {
      line.style.display = 'none';
    });
  }
    
    
  selectDetails() {
    this.showForm = true;
    this.activeLineIndex = 0;// Afficher le formulaire lorsque vous cliquez sur "Details"
  }

  selectValues() {
    this.showForm = false;
    this.activeLineIndex = 1 ; // Afficher la table lorsque vous cliquez sur "Values"
  }
  submit(): void {
    console.log('Submitting data...');

    const formDataToSend :StaticData = {
      Name: this.formDataName,
      Status: "Inactive/Draft",
      Category: this.formDataCategory,
      Types: this.formDataTypes,
      DateCreated: this.formDataCreateDate,
     CreatedBy: this.formDataCreatedBy,
      InputValues: this.formvalues,
     
      // Ajoutez d'autres propriétés si nécessaire
    };
  
 
    //this.dataService.setFormData(formDataToSend);
    this.dataService.addToSubmittedDataList(formDataToSend); // Ajoutez les données soumises à la liste

  }
  goToStatic() {
    this.router.navigate(['/static'])
  }

  moveLine(index: number) {
    this.activeLineIndex = index;
  }


    
  }
    
