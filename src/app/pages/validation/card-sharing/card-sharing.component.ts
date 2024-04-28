import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { SelectedItemService } from '../communiation.service';
import { ValidDiaComponent } from '../valid-dia/valid-dia.component';
import { RejectDiaComponent } from '../reject-dia/reject-dia.component';
import { MatDialog } from '@angular/material/dialog';
import { MultiSelectComponent, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { version } from 'os';
import { Router } from '@angular/router';
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-card-sharing',
  templateUrl: './card-sharing.component.html',
  styleUrls: ['./card-sharing.component.scss']
})
export class CardSharingComponent implements OnInit {
  selectedItemName: string = '';
  selectedVersion: number;
  data: any[] = [];
  filteredData: any[];
  cities!: City[];
  options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4']; // Remplacez par vos options
  selectedOptions: string[] = [];
  isEditing: boolean = false;

  valider(item: any): void {
    // Mettre à jour la variable isEditing lorsque le bouton Edit est cliqué
    this.isEditing = true;
  }
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
  publishedVersions: any[];


  get selectedEntities(): string[] {
    return this.entities.filter(entity => entity.selected).map(entity => entity.name);
  }
  goToVal() {
    // Naviguer vers la page de détails en utilisant l'ID de l'élément
    this.router.navigate(['/valide']);
  }
  //@Output() itemNameChange: EventEmitter<string> = new EventEmitter<string>();
  constructor(private dialog: MatDialog, private selectedItemService: SelectedItemService, private router: Router) { }
  ngOnInit(): void {
    // Abonnement à l'observable selectedItem$ pour récupérer les mises à jour du selectedItemName
    this.selectedItemService.selectedItem$.subscribe(name => {
      this.selectedItemName = name; // Mettre à jour le selectedItemName lorsque des mises à jour sont émises
    });

    this.selectedItemService.selectedVersion$.subscribe((newVersion: any) => {
      this.selectedVersion = newVersion;
    });
    this.publishedVersions = this.selectedItemService.getPublishedVersions();

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
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  supprimer(item: any): void {
    console.log('Élément à supprimer :', item);
    // Trouver l'index de l'élément à supprimer dans le tableau publishedVersions
    const index = this.publishedVersions.findIndex(version => version.id === item.id);
    if (index !== -1) {
      // Supprimer l'élément du tableau
      this.publishedVersions.splice(index, 1);
      console.log('Nouvelles données après suppression :', this.publishedVersions);
    } else {
      console.log('Élément non trouvé dans le tableau.');
    }
  }


  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
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



