import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from './dialogue/dialogue.component';
import { Router } from '@angular/router';
import { StaticData } from '../models/staticdata';
import { FormsModule } from '@angular/forms';
//import { StaticService } from './static.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './data.service';
import { StaticService } from './static.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LocalService } from '../admin-local/local.service';
import { combineLatest } from 'rxjs';


//import { BsModalRef } from 'ngx-bootstarp/modal';
declare var $: any;
interface FormData {
  ID: number;
  Name: string;
  Status: string;
  Category: string;
  Types: string[];
  CreateDate: string;
  CreatedBy: string;
}

@Component({
  selector: 'app-tables',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],

})
export class StaticComponent {
  data: any[] = [];
  filteredData: any[];
  items: any[] = [
  ];
  i: number = 0;

  //modalRef?: BsModalRef;
  item: StaticData[] = [];
  showRejectDialog: boolean = false;
  SDtoDelete: StaticData | undefined;
  showFirstDialog: boolean = false;
  showConfirmationDialog: boolean = true;
  dataName: string = '';
  isItemSelected: boolean = false;

  errorMessages: any;
  formData: StaticData;
  Name: any;
  Category: any;
  Types: any;
  Status: any;
  ID: any;
  CreateDate: any;
  CreatedBy: any;
  submitButtonClicked: boolean = false;
  formDataList: StaticData[] = [];
  index: number = -1;
  show: boolean;
  dataSuccess: boolean;
  listValues: string[] = [];
  deletee: boolean = false;
  Id: number;
  filteredDataList: any[];
  createdByFilterText: string;
  filterText: any;



  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

  constructor(private localservice: LocalService, private dialog: MatDialog, private router: Router, private toastr: ToastrService, private dataService: DataService, private staticService: StaticService) {


  }





  // Méthode pour gérer le changement de la case à cocher
  onCheckboxChange(checked: boolean, item: any) {
    item.checked = checked;

    this.isItemSelected = this.items.some(item => item.checked);
  }
  goToDetails(id: number) {


    const item = id;
    console.log("iiii", item);
    this.dataService.setSelectedItemID(item)
    this.router.navigate(['/details', id]);
  }
  // Méthode pour gérer l'action de validation
  valider(item: any) {
    // Logique pour la validation
    console.log("Validating item:", item);
  }

  // Méthode pour gérer l'action de rejet
  rejeter(item: any) {
    // Logique pour le rejet
    console.log("Rejecting item:", item);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Supprimer les espaces vides
    filterValue = filterValue.toLowerCase(); // Mettre en minuscule
    // Appliquer le filtre
    this.filteredData = this.data.filter(item => {
      // Filtrer en fonction du nom ou d'autres propriétés
      return item.name.toLowerCase().includes(filterValue);
    });
  } updateStatus(newStatus: string) {
    // Parcourir le tableau items
    this.items.forEach(item => {
      // Vérifier si l'élément correspond à celui rejeté
      if (item.status === "Inactive/Draft") {
        // Mettre à jour le statut de l'élément rejeté
        item.status = newStatus;
      }
    });
  }

  formDataName: string;
  formDataCategory: string;
  formDataTypes: string;
  formDataStatus: string;
  formDataId: number;
  formDataCreateDate: String;
  formDataCreatedBy: string;
  showDeleteButton: Boolean = false;
  formvalues: String;
  itemm: StaticData;
  list: any[] = [];
  deta: any[] = [];
  ngOnInit(): void {


    const id = this.dataService.Newid;
    const Change = this.dataService.NewB;
    console.log(Change);
    const modifiedName = this.dataService.getNewName();
    const modifiedTypes = this.dataService.getNewType();
    const modifiedCatecory = this.dataService.getNewCatecory();
    const modifiedCrea = this.dataService.getNewC();
    console.log("MT", modifiedTypes);
    console.log("MN", modifiedName);

    console.log(id);

    this.getNewDataFromService();
    console.log("waw");
    const storedData = localStorage.getItem('StaticData');
    if (storedData) {
      this.formDataList = JSON.parse(storedData);
    }

    this.dataService.currentDataName.subscribe(name => {
      this.dataName = name;
      console.log('Received data name:', this.dataName);
    });

    this.dataService.currentIDName.subscribe(name => {
      this.Id = name;
      this.staticService.DeleteStaticData(this.formDataList[this.Id - 1]).subscribe({
        next: (response) => {
          console.log("Response from API:", response);
          this.toastr.success('Data deleted successfully!', 'Success');
        },
        error: (error) => {
          this.formDataList.splice(this.Id - 1, 1);
          localStorage.setItem('staticData', JSON.stringify(this.formDataList));
          console.error("Error deleting data:", error);
          this.toastr.error('Failed to delete data!', 'Error');
        }
      });

      console.log("avant", this.formDataList);
      console.log("apres", this.formDataList);
      console.log('Received data ID:', this.Id);
    });

    combineLatest([this.localservice.currentDataList, this.dataService.formData$])
      .subscribe(([datalist, formData]) => {
        this.list = datalist;
        console.log("specific", this.list);

        if (formData) {
          this.showDeleteButton = true;
          console.log("yalaa2", this.formData);
          this.formDataList.push(formData);

          console.log("darine", this.formDataList);
          this.index += 1;
          console.log("index", this.index);

          this.formDataName = formData.Name;
          this.formDataCategory = formData.Category;
          this.formDataTypes = formData.Types;
          if (!formData.Status || (formData.Status !== 'Approval' && formData.Status !== 'Rejected')) {
            formData.Status = 'Inactive/Draft';
          }
          this.formDataId = 1;
          this.formDataCreateDate = new Date().toLocaleDateString('fr-FR', {
            hour12: false,
            timeZone: 'UTC'
          });
          this.formDataCreatedBy = 'name';
          this.showDeleteButton = true;
          this.listValues.push(formData.null);
          console.log("null", this.listValues);
          this.show = true;
          this.items.push(formData);
          console.log("name&", this.formDataList);

          this.formDataList.forEach(item => {
            item.DateCreated = new Date().toLocaleDateString('fr-FR', {
              hour12: false,
              timeZone: 'UTC'
            });
            if (!item.Status || (item.Status !== 'Approval' && item.Status !== 'Rejected')) {
              item.Status = 'Inactive/Draft';
            }
            item.CreatedBy = this.formDataCreatedBy;
          });

          console.log("name22", this.formDataList);
          for (let i in this.formDataList) {
            const name = this.formDataList[i].Name;
            const category = this.formDataList[i].Category;
            const date = this.formDataList[i].DateCreated;
            console.log("name", name);
            console.log("category", category);
            console.log("date", date);
          }
          console.log("roro", this.formDataList);
        }
        if (Change) {

          this.formDataList[id - 1].Name = modifiedName;
          this.formDataList[id - 1].Types = modifiedTypes;
          this.formDataList[id - 1].Category = modifiedCatecory;
          this.formDataList[id - 1].CreatedBy = modifiedCrea;
          console.log(this.formDataList[id - 1].Name);
        }
        localStorage.setItem('StaticData', JSON.stringify(this.formDataList));
        this.dataService.updateFormDataList(this.formDataList);

        // Supposez que vos objets ont une propriété 'id' unique
        const combinedList = this.formDataList.concat(this.list);

        // Utiliser un Map pour éliminer les doublons basés sur l'id
        const uniqueList = Array.from(new Map(combinedList.map(item => [item.Name, item])).values());

        // Assigner la liste unique à formDataList
        this.formDataList = uniqueList;

        localStorage.setItem('StaticData', JSON.stringify(this.formDataList));
        console.log("Combined list:", this.formDataList);
      });

    this.filteredDataList = this.formDataList;

  }

  showNotification(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

    }, {
      type: type[color],
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
  Reflesh() {
    this.dataService.currentItem.subscribe(item => {
      if (item) {
        const index = this.formDataList.findIndex(data => data.Name === item.Name && data.Category === item.Category && data.Types === item.Types);
        if (index !== -1) {
          if (this.formDataList[index].Status !== 'Approval') {
            this.formDataList[index].Status = 'Approval';
          }
        } else {
          item.Status = 'Approval';
          this.formDataList.push(item);
        }
        localStorage.setItem('StaticData', JSON.stringify(this.formDataList));
      }
    });

    this.dataService.currentItem1.subscribe(item => {
      if (item) {
        const index = this.formDataList.findIndex(data => data.Name === item.Name && data.Category === item.Category && data.Types === item.Types);
        if (index !== -1) {
          if (this.formDataList[index].Status !== 'Rejected') {
            this.formDataList[index].Status = 'Rejected';
          }
        } else {
          item.Status = 'Rejected';
          this.formDataList.push(item);
        }
        localStorage.setItem('StaticData', JSON.stringify(this.formDataList));
      }
    });
  }
  getNewDataFromService() {
    const newData = this.dataService.getNewData();
    // Faites quelque chose avec les nouvelles données récupérées
    console.log(newData);
  }
  Update(i: number) {

    const modifiedName = this.dataService.getNewName();
    console.log("MN", modifiedName);
    if (modifiedName == undefined) {
      this.formDataList[i].Name = this.formData.Name;
    } else {
      this.formDataList[i].Name = modifiedName;
    }
    const modifiedCategory = this.dataService.getModifiedCategory();
    console.log("MC", modifiedCategory);
    if (modifiedCategory == undefined) {
      this.formDataList[i].Category = this.formData.Category;

    } else {
      this.formDataList[i].Category = modifiedCategory;
    }

    const modifiedTypes = this.dataService.getModifiedTypes();
    if (modifiedTypes == undefined) {
      console.log("MT", modifiedTypes);
      this.formDataList[i].Types = this.formData.Types;
    } else {
      this.formDataList[i].Types = modifiedTypes;
    }

    const modifiedCreated = this.dataService.getModifiedCreatedBy();
    console.log("MT", modifiedCreated);
    if (modifiedCreated == undefined) {
      this.formDataList[i].CreatedBy = this.formData.CreatedBy;
    } else {
      this.formDataList[i].CreatedBy = modifiedCreated;
    }

  }

  incrementIndex() {
    this.i++;
  }

  delete(i: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    console.log("zzz");
    this.show = true;
    this.dataService.confirm$.subscribe(result => {

      if (result) {
        console.log("view", this.formDataList[i]);
        console.log("view", this.formDataList[i]);

        this.staticService.DeleteStaticData(this.formDataList[i]).subscribe({
          next: (response) => {
            console.log("Response from API:", response);
            // Remove the item from the list after successful deletion
            this.formDataList.splice(i, 1);
            localStorage.setItem('StaticData', JSON.stringify(this.formDataList));
            this.toastr.success('Data deleted successfully!', 'Success');
          },
          error: (error) => {
            console.error("Error deleting data:", error);
            this.formDataList.splice(i, 1);
            localStorage.setItem('StaticData', JSON.stringify(this.formDataList));
            this.toastr.error('Failed to delete data!', 'Error');
            this.router.navigate(['/static']);
          }
        });
      }
    });

  }



  generateHTML(): string {
    let html = '';
    this.formDataList.forEach(i => {
      html += `<tr *ngFor="let i of formDataList">`;
      html += `<td class="px-4 py-3 mx-6">ddddd</td>`; // Colonne ID
      html += `<td class="px-4 py-3 mx-6">${i.Name}</td>`; // Colonne Name
      html += `<td class="px-4 py-3 mx-6">Inactive</td>`; // Colonne Status
      html += `<td class="px-4 py-3 mx-6">${i.Category}</td>`; // Colonne Category
      html += `<td class="px-4 py-3 mx-6">${i.Types}</td>`; // Colonne Types
      html += `<td class="px-4 py-3 mx-6"><!-- Actions --></td>`; // Colonne Actions
      html += `</tr>`;
    });
    return html;
  }
  applyStatusFilter(statusFilter: string) {
    // Si le champ de filtre est vide, afficher toutes les données
    if (!statusFilter.trim()) {
      this.formDataList = this.formDataList;
    } else {
      // Filtrer les données en fonction du statut entré (en utilisant une correspondance partielle)
      this.formDataList = this.formDataList.filter(item => item.Status.toLowerCase().includes(statusFilter.toLowerCase()));

    }
  }

  applyCreatFilter(statusFilter: string) {
    // Si le champ de filtre est vide, afficher toutes les données
    if (!statusFilter.trim()) {
      this.formDataList = this.filteredDataList;
      console.log(this.filteredDataList);
    } else {
      // Filtrer les données en fonction du statut entré (en utilisant une correspondance partielle)
      this.formDataList = this.filteredDataList.filter(item => item.CreatedBy.toLowerCase().includes(statusFilter.toLowerCase()));

    }
  }
  addItemToTable(newItem: any) {
    this.items.push(newItem);
    console.log("eeee", this.items);
    console.log("sss", newItem);// Ajoutez les données saisies au tableau items
  }
  submittedDataList: any[] = [];
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogsComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }
}
