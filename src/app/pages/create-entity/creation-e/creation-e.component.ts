import { Component } from '@angular/core';
import { ValidService } from '../../validation/validation.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../static/data.service';
import { SelectedItemService } from '../../validation/communiation.service';
import { Entity } from '../../models/Entity';
import { NgForm } from '@angular/forms';
import { DialogEComponent } from '../dialog-e/dialog-e.component';
import { NotificationService } from '../../static/details/notification.service';
interface ApiResponse {
  message: string;
  entityName: string;
}

@Component({
  selector: 'app-creation-e',
  templateUrl: './creation-e.component.html',
  styleUrls: ['./creation-e.component.scss']
})
export class CreationEComponent {
  showFirstDialog: boolean= false;

  constructor(
    private valideService: ValidService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private dataservice: DataService,
    private validservice: SelectedItemService,private notificationService: NotificationService
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

  langue: string[] = [];
  onLanguageSelect(item: any) {
    this.langue.push(item);

    console.log('Language selected:', this.langue);
    this.dataservice.changeLang(this.langue);
  }

  onLanguageDeselect(item: any) {
    console.log('Language deselected:', item);
  }



  formDataList: Entity[] = [];
  selectedLanguagesDict: { [key: string]: string[] } = {};
  
  create(form: NgForm) {

    const formData = form.value;
    const name = formData.name;
    const selectedLanguages = formData.language;


    console.log("name", name);
    const address = formData.address;
    console.log("address", address);
    const descreption = formData.description;
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
    //localStorage.setItem('entity', JSON.stringify(this.formDataList));

    const entity: Entity = {
      name: formData.name,
      address: formData.address,
      descreption: formData.description,
      status: formData.status,
      dateCreated: formattedDateTime,
      phoneNumber: phoneNum,
      responsible: formData.responsible,
      languages: selectedLanguages,
    };

    this.valideService.Addition(entity).subscribe({
      next: (response: ApiResponse) => {
        console.log("Response from API:", response);
        this.notificationService.show1('Entity created successfully!');
        console.log(response.entityName);
        this.toastr.success('Entity added successfully!', 'Success');
      },
      error: (error) => {
        console.error("Error adding entity:", error);
        this.notificationService.show1('Entity created successfully!');
      }
    });
    this.notificationService.show2('Entity created successfully!');
    this.dataservice.setFormDataList(this.formDataList);
    form.resetForm();
    this.dataservice.updateFormDataList1(this.formDataList);
    for (let item of this.formDataList) {
      this.dataservice.addToList(item.name);
      this.lisst.push(item.name);
      console.log("list entity", this.lisst);
    }
    console.log("langggg", this.formDataList[0].languages)
    this.showFirstDialog = true;
    this.notificationService.show2('Entity created successfully!');
  }
  showForm = false;
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

        console.error("Error deleting entity:", error);
        this.toastr.error('Failed to delete entity!', 'Error');
      }
    });
   
  }
  onClose() {
    // Réinitialise les valeurs et cache les deux dialogues

    this.showFirstDialog = true;
    //this.showSecondDialog = false;
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

  




}
