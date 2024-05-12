import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { SelectedItemService } from '../communiation.service';
import { ValidDiaComponent } from '../valid-dia/valid-dia.component';
import { RejectDiaComponent } from '../reject-dia/reject-dia.component';
import { MatDialog } from '@angular/material/dialog';
import { MultiSelectComponent, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { version } from 'os';
import { SharedSD } from '../../models/SharedSD';
import { ValidService } from '../validation.service';

interface City {
  name: string,
  code: string
}
interface Version {
  selectedItems2: any;
  id: number;
  selectedLanguages: any[];
  // Autres propriétés de votre modèle de données...
  selectedItems: any[]; // Déclaration de la propriété selectedItems
}

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  encapsulation: ViewEncapsulation.None,
 
})
export class ShareComponent implements OnInit {
  selectedItemName: string = '';
  selectedVersion: number;
  data: any[] = [];
  filteredData: any[];
  cities!: City[];
  options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4']; // Remplacez par vos options
  selectedOptions: string[] = [];

  selectedCities!: City[];
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
  isItemSelected: boolean = false;
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
    showStatusField: boolean=false;
    toastr: any;
    showLanguageSelect: boolean = false;
  showLangueField: boolean = false;
  showEntitieField: boolean = false;

  getselectedEntities(): string[] {
    return this.entities.filter(entity => entity.selected).map(entity => entity.name);
    
  }
  showShareField: boolean = true;
  isEditing: boolean = false; //

  valider(item: any): void {

    this.isEditing = true;
    console.log("dd", item);
    console.log("voir", item.selectedItems);
    console.log("voire", item.selectedItems2);
    const entityNames = item.selectedItems.map(entity => entity.itemName);
    const LanguageNames = item.selectedItems2.map(entity => entity.itemName);
    console.log("eeeeeee", entityNames);
    if (item.selectedItems == undefined) {
      status = "No Shareable";
      console.log("wow", status);
    } else {
      status = "Shareable";
      console.log("wow", status);
    }
    console.log("ver", this.publishedVersions);
    const versionName = ["new  " +  this.selectedItemName  + " Version "  + item.versionNumber];
    console.log("vv", versionName);
    const sharedSD: SharedSD = {
      Name: this.selectedItemName,
      Versions: versionName,
      Status: status,
      Entity: entityNames,
      DateCreated: new Date(),
      CreatedBy: "name",
      Language: LanguageNames, 

    }
    console.log("eee", sharedSD);
    this.validService.saveSharedStaticData(sharedSD).subscribe(
      response => {
        console.log('Shared successful:', response);
        this.toastr.success('Données enregistrées avec succès.');
      },
      error => {
        // Erreur lors de la requête
        this.toastr.error('Une erreur s\'est produite lors de l\'enregistrement des données.');
        console.error(error);
      });
    this.showShareField = false;
    this.showLanguageSelect = false;
    this.showStatusField = true;
    this.showLangueField = true;
    this.showEntitieField = true;
    this.selectedEntities = this.selectedItems.map(item => item.itemName);
    this.selectedLanguage = this.selectedItems2.map(item => item.itemName);
    console.log("entity", this.selectedEntities);
 
    

  }

  selectedEntities: string[];
  selectedLanguage: string[];

  // Mettez à jour selectedEntities chaque fois que selectedItems change
  updateSelectedEntities(): void {
    this.selectedEntities = this.selectedItems.map(item => item.itemName);
    console.log("Entity", this.selectedEntities);
  }

  updateSelectedLanguages(): void {
    this.selectedLanguage = this.selectedItems2.map(item => item.itemName);
    console.log("Entity", this.selectedLanguage);
  }
  onItemSelect(item: any, version: Version) {
    this.showLanguageSelect = true;
    if (!this.showShareField) {
      console.log(item);
      console.log(this.selectedItems);
      this.updateSelectedEntities();
      version.selectedItems.push(item);
  
// Mettre à jour selectedEntities
    }
  }
  onItemSelect1(item: any, version: Version) {
    
    if (!this.showLanguageSelect) {
    
      this.updateSelectedLanguages();
      version.selectedItems2.push(item);

      // Mettre à jour selectedEntities
    }
  }

  loadPublishedVersions(): void {
    // Simulons trois versions publiées avec des identifiants uniques
    for (let i = 1; i <= 3; i++) {
      this.publishedVersions.push({
        id: i,
        selectedItems2:[],
        selectedLanguages:[],
        selectedItems: [] // Initialisation des entités sélectionnées à vide
      });
    }
    console.log("version", this.publishedVersions);
  }
  OnItemDeSelect(item: any, version: Version) {
    if (!this.showShareField) {
      console.log(item);
      console.log(this.selectedItems);
      this.updateSelectedEntities();
      version.selectedItems = version.selectedItems.filter(selectedItem => selectedItem !== item);
      console.log("entity", version.selectedItems);
    }
  }
  OnItemDeSelect1(item: any, version: Version) {
    if (!this.showLanguageSelect) {
     
      this.updateSelectedEntities();
      this.updateSelectedLanguages();
      
      version.selectedItems2 = version.selectedItems2.filter(selectedItem => selectedItem !== item);
      console.log("Language", version.selectedItems2);
    }
  }
  onLanguageSelect(item: any, version: Version) {
    // Mettez à jour les langues sélectionnées pour cette version
    version.selectedLanguages.push(item.itemName);
  }

  onLanguageDeselect(item: any, version: Version) {
    // Retirer la langue désélectionnée de la liste des langues sélectionnées pour cette version
    version.selectedLanguages = version.selectedLanguages.filter(language => language !== item.itemName);
  }

  dropdownList2= [];
  selectedItems2 = [];
  dropdownSettings2 = {};
  //@Output() itemNameChange: EventEmitter<string> = new EventEmitter<string>();
  constructor(private dialog: MatDialog, private selectedItemService: SelectedItemService, private validService: ValidService) { }
  ngOnInit(): void {
    
    this.selectedItemService.selectedItem$.subscribe(name => {
      this.selectedItemName = name; // Mettre à jour le selectedItemName lorsque des mises à jour sont émises
    });
    this.loadPublishedVersions();
    this.selectedItemService.selectedVersion$.subscribe((newVersion: any) => {
      this.selectedVersion = newVersion;
     
    });
    this.publishedVersions = this.selectedItemService.getPublishedVersions();
    console.log("ver", this.publishedVersions);
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    
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
      this.dropdownSettings = {
        singleSelection: false,
        text: "Select Entities",
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        enableSearchFilter: true,
        classes: "myclass custom-class"
    };
   
      this.dropdownList2 = [
        { "id": 1, "itemName": "English" },
        { "id": 2, "itemName": "French" },
        { "id": 3, "itemName": "Spanish" },
        { "id": 4, "itemName": "German" },
        { "id": 5, "itemName": "Italian" },
        { "id": 6, "itemName": "Arab" },
        { "id": 7, "itemName": "Russe" },
        { "id": 8, "itemName": "Hindi" },
        { "id": 9, "itemName": "Bengali" },
        { "id": 10, "itemName": "Portugais" }
      ];
      this.selectedItems2 = [

      ];
      this.dropdownSettings2 = {
        singleSelection: false,
        text: "Select Languages",
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        enableSearchFilter: true,
        classes: "myclass custom-class"
      };
    }
    
    
    onSelectAll(items: any){
      console.log(items);
    }
    onDeSelectAll(items: any){
      console.log(items);
    }

 

  updateSelectedVersion(version: string): void {
    this.selectedItemService.updateSelectedVersion(version);
  }
  
  updateSelectedItemName(name: string): void {
    this.selectedItemService.updateSelectedItem(name);
  }
  onCheckboxChange(checked: boolean, item: any) {
    item.checked = checked;
    // Mettre à jour le drapeau en fonction de l'état de la sélection
    this.isItemSelected = this.items.some(item => item.checked);
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
      if (item.status === "Inactive") {
        // Mettre à jour le statut de l'élément rejeté
        item.status = newStatus;
      }
    });
  }
}



