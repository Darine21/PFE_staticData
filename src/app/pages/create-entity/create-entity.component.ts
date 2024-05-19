import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as L from 'leaflet';
import { Entity } from '../models/Entity';
import { ValidService } from '../validation/validation.service';
import { ToastrService } from 'ngx-toastr';
import { DialogEComponent } from './dialog-e/dialog-e.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../static/data.service';
import { MouseEvent } from '@agm/core';
import { Language } from '../models/Language';

interface ApiResponse {
  message: string;
  entityName: string;
}

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss']
})
export class CreateEntityComponent implements AfterViewInit {
  map: any;
  lat: number = 51.673858;
  lng: number = 7.815982;
  zoom: number = 8;
  list: string[] = [];
  languages: Language[] = [
    new Language('en', 'English'),
    new Language('fr', 'French'),
    new Language('es', 'Spanish'),
    new Language('de', 'German'),
    new Language('it', 'Italian'),
    // Ajoutez d'autres langues si nécessaire
  ];
  selectedLanguages: string[] = []; // Ajoutez cette ligne
  showLanguageSelect: boolean;

  constructor(
    private valideService: ValidService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private dataservice: DataService
  ) { }
  dropdownList2 = [
  
      { "id": "en", "itemName": "English" },
      { "id": "fr", "itemName": "French" },
      { "id": "es", "itemName": "Spanish" },
      { "id": "de", "itemName": "German" },
      { "id": "it", "itemName": "Italian" },
      { "id": "ar", "itemName": "Arab" },
      { "id": "ru", "itemName": "Russian" },
      { "id": "hi", "itemName": "Hindi" },
      { "id": "zh", "itemName": "Chinese" },
      { "id": "hu", "itemName": "Hungarian" },
      { "id": "id", "itemName": "Indonesian" },
      { "id": "ga", "itemName": "Irish" },
      { "id": "ja", "itemName": "Japanese" },
      { "id": "ko", "itemName": "Korean" },
      { "id": "pl", "itemName": "Polish" },
      { "id": "pt", "itemName": "Portuguese" },
      { "id": "sv", "itemName": "Swedish" },
      { "id": "tr", "itemName": "Turkish" },
      { "id": "uk", "itemName": "Ukrainian" },
      { "id": "vi", "itemName": "Vietnamese" },
      { "id": "da", "itemName": "Danish" },
      { "id": "el", "itemName": "Greek" },
      { "id": "ms", "itemName": "Malay" },
      { "id": "q", "itemName": "Albanian" },
];
selectedItems2 = [

  ];
  multiselectSettings = {
    enableSearch: true, // Activer la fonction de recherche
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true,
    searchPlaceholderText: 'Search...',
    // Ajoutez d'autres paramètres de configuration si nécessaire
  };
  dropdownSettings2 = {
    singleSelection: false,
    text: "Select Languages",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class",
    enableSearch: true,
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true,
    searchPlaceholderText: 'Search...'
  };
  ngAfterViewInit(): void {
    this.initMap();
  }

  onLanguageSelect(item: any) {
    console.log('Language selected:', item);
  }

  onLanguageDeselect(item: any) {
    console.log('Language deselected:', item);
  }

  initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    const marker = L.marker([51.5, -0.09]).addTo(this.map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  }

  formDataList: Entity[] = [];

  create(form: NgForm) {
    const storedData = localStorage.getItem('entity');
    if (storedData) {
      this.formDataList = JSON.parse(storedData);
    }
    const formData = form.value;
    console.log("form", formData);
    const name = formData.name;
    console.log("name", name);
    const address = formData.address;
    console.log("address", address);
    const descreption = formData.descreption;
    console.log("descreption", descreption);
    const status = formData.status;
    console.log("status", status);
    const responsable = formData.responsible;
    console.log("responsable", responsable);
    const phoneNum = formData.phoneNumber;
    const selectedLanguages = formData.languages;
    console.log("Lang", selectedLanguages);
    console.log("num", phoneNum);

    this.formDataList.push(formData);

    console.log("list", this.formDataList);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes());
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    this.formDataList.forEach(item => {
      item.dateCreated = formattedDateTime;
    });
    localStorage.setItem('entity', JSON.stringify(this.formDataList));

    const entity: Entity = {
      name: formData.name,
      address: formData.address,
      descreption: formData.descreption,
      status: formData.status,
      dateCreated: formattedDateTime,
      phoneNumber: phoneNum,
      responsible: formData.responsible,
      language: selectedLanguages,
    };

    this.valideService.Addition(entity).subscribe({
      next: (response: ApiResponse) => {
        console.log("Response from API:", response);
        console.log(response.entityName);
        this.toastr.success('Entity added successfully!', 'Success');
      },
      error: (error) => {
        console.error("Error adding entity:", error);
        this.toastr.error('Failed to add entity!', 'Error');
      }
    });
    this.dataservice.setFormDataList(this.formDataList);
    form.resetForm();
    this.dataservice.updateFormDataList1(this.formDataList);
    for (let item of this.formDataList) {
      this.dataservice.addToList(item.name);
      this.lisst.push(item.name);
      console.log("list entity", this.lisst);
    }
  }
  lisst: string[] = [];
  delete(i: number) {
    console.log("sss", this.formDataList[i]);
    this.valideService.DeleteEntity(this.formDataList[i]).subscribe({
      next: (response) => {
        console.log("Response from API:", response);
        this.toastr.success('Entity deleted successfully!', 'Success');
      },
      error: (error) => {
        this.formDataList.splice(i, 1);
        localStorage.setItem('entity', JSON.stringify(this.formDataList));
        console.error("Error deleting entity:", error);
        this.toastr.error('Failed to delete entity!', 'Error');
      }
    });
  }

  openDialog(i: number): void {
    const item = i;
    console.log("dataaa", item);
    this.dataservice.setSelectedItemID(item)
    const dialogRef = this.dialog.open(DialogEComponent, {
      width: '500px',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
