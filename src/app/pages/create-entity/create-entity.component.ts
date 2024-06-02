import { Component, AfterViewInit, OnInit } from '@angular/core';
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
import { SelectedItemService } from '../validation/communiation.service';
import { CreationEComponent } from './creation-e/creation-e.component';
import { ConfirmationDialogComponent } from '../static/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from '../static/details/notification.service';

interface ApiResponse {
  message: string;
  entityName: string;
}

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss']
})
export class CreateEntityComponent implements OnInit {
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
    formDataName: any;

  constructor(
    private valideService: ValidService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private dataservice: DataService,
    private validservice: SelectedItemService,
    private notification: NotificationService
  ) { }
  filterEmptyItems() {
    this.formDataList = this.formDataList.filter(item => item && item[0] && item[0].name);
    localStorage.setItem('entity', JSON.stringify(this.formDataList));
  }
  lisste: string[] = [];
  selectedLanguagesDict: { [key: string]: string[] } = {};
  ngOnInit(): void {
    const storedData = localStorage.getItem('entity');
    if (storedData) {
      this.formDataList = JSON.parse(storedData);
      this.filterEmptyItems(); // Filtrer les éléments vides après initialisation
    }

    this.dataservice.formDataList2$.subscribe(formdata => {
      if (formdata) {
        this.formDataList.push(formdata);
       //localStorage.setItem('entity', JSON.stringify(this.formDataList));

        this.filterEmptyItems(); // Filtrer les éléments vides après ajout
        console.log("darine", this.formDataList);
        localStorage.setItem('entity', JSON.stringify(this.formDataList));
        this.dataservice.updateFormData1(this.formDataList);
        //this.validservice.updateList1(this.formDataList);

        this.lisst = [];
        for (let item of this.formDataList) {
          if (item && item[0] && item[0].name) {
            //this.dataservice.addToList(item[0].name);
            this.lisst.push(item[0].name);
            this.selectedLanguagesDict[item[0].name] = item[0].null.map(lang => lang.itemName);
            
          }
        }
        console.log("dicc", this.selectedLanguagesDict);
        console.log("list entity", this.lisst);
        this.dataservice.updateSelectedLanguagesDict(this.selectedLanguagesDict);
       
        this.validservice.updateList(this.lisst);
        console.log("Dictionnaire des langues sélectionnées :", this.dataservice.getAllSelectedLanguages());
      }
    });
  }


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
 
  langue: string[] = [];
  onLanguageSelect(item: any) {
    this.langue.push(item);
   
    console.log('Language selected:', this.langue);
    this.dataservice.changeLang(this.langue);
  }

  onLanguageDeselect(item: any) {
    console.log('Language deselected:', item);
  }

  

  formDataList:any[] = [];
create(form: NgForm) {

  const formData = form.value;
  const name = formData.name;
  const selectedLanguages = formData.language;
  
  
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

  console.log("Lang", selectedLanguages);
  console.log("num", phoneNum);
  // Ajouter l'entité et ses langues au dictionnaire
  if (selectedLanguages) {
    console.log("Langues sélectionnées :", selectedLanguages);
    this.dataservice.setSelectedLanguages(name, selectedLanguages.map(lang => lang.itemName));
  } else {
    console.log("Aucune langue sélectionnée.");
  }

  console.log("Dictionnaire des langues sélectionnées :", this.dataservice.getAllSelectedLanguages());


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
      languages: selectedLanguages,
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
    console.log("langggg", this.formDataList[0].languages)
  }
  showForm = false;
  lisst: string[] = [];
  show=false
  delete(i: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    console.log("zzz");
    this.show = true;
    this.dataservice.confirm$.subscribe(result => {

      if (result) {
        console.log("view", this.formDataList[i]);
        console.log("view", this.formDataList[i]);
        this.valideService.DeleteEntity(this.formDataList[i]).subscribe({
          next: (response) => {
            console.log("Response from API:", response);
            this.notification.show('Entity deleted successfully!');
          },
          error: (error) => {
            this.formDataList.splice(i, 1);
            localStorage.setItem('entity', JSON.stringify(this.formDataList));
            
            console.error("Error deleting entity:", error);
            this.notification.show('Entity deleted successfully!');
          }
        });

      }
    })
  }






  
  openCreateModal() {
    const modal = document.getElementById('createModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeCreateModal() {
    const modal = document.getElementById('createModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  opendialogue() {
    const dialogRef = this.dialog.open(CreationEComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
