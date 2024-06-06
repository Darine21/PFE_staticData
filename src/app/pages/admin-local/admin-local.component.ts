import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DialogSpecComponent } from '../admin-local/dialog-spec/dialog-spec.component';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
//import { StaticService } from './static.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../static/data.service';
import { StaticService } from '../static/static.service';

import { ValidService } from '../validation/validation.service';
import { LocalService } from './local.service';
import { ConfirmationDialogComponent } from '../static/confirmation-dialog/confirmation-dialog.component';
import { EntityLocal } from '../models/EntityLocal';
import { StaticData } from '../models/staticdata';
import { RequestComponent } from './request/request.component';
@Component({
  selector: 'app-admin-local',
  templateUrl: './admin-local.component.html',
  styleUrls: ['./admin-local.component.scss']
})
export class AdminLocalComponent implements OnInit {
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
  formDataList1: EntityLocal[] = [];
  index: number = -1;
  show: boolean;
  dataSuccess: boolean;
  listValues: string[] = [];
    formData1: any;
    list: string[]=[];
    Id: number;


  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

  constructor(private locale:LocalService,private localService:LocalService,private dialog: MatDialog, private router: Router, private toastr: ToastrService, private dataService: DataService, private staticService: StaticService, private validservice: ValidService) {


  }


  openrequest() {
    const dialogRef = this.dialog.open(RequestComponent, {
      width: '600px', // Customize the width as needed
    // Custom class for additional styling
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle after close
    });

  }


  // Méthode pour gérer le changement de la case à cocher
  onCheckboxChange(checked: boolean, item: any) {
    item.checked = checked;

    this.isItemSelected = this.items.some(item => item.checked);
  }
  goToDetails(id: number) {
    console.log(this.formDataList1);
    console.log("ver", this.formDataList1[id-1].Status);
    const item = id;
    if (this.formDataList1[id-1].Status == "Approval") {
      this.openrequest();
    } else {
      console.log("iiii", item);
      this.dataService.setSelectedItemID(item)
      this.router.navigate(['/detail-local']);
    }
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
  formDataCreateDate: string;
  formDataCreatedBy: string;
  showDeleteButton: Boolean = false;
  formvalues: String;
  List: any[] = [];
  ajoutList: any[] = [];
  Entity: string;
  formDataList2:any[]=[]
  ngOnInit(): void {
    this.locale.currentEntity.subscribe(entity => {
      this.Entity = entity;
      console.log("Entity value in other page:", entity);
      // Utilisez la valeur de l'entité comme bon vous semble dans cette page
    });
    this.dataService.getEntity(this.Entity);
    const Name = "enti"
    console.log("local", localStorage.share);


    const id = this.dataService.Newid;
    const Change = this.dataService.NewB;
    console.log(Change);
    this.dataService.currentIDName$.subscribe(name => {
      this.Id = name;
      const val = this.Id -1 ;
      console.log('Received data ID:', val);
      console.log("name", this.formDataList1[this.Id - 1].Name)
      this.staticService.DeleteDataEntity(this.formDataList1[this.Id - 1].Name).subscribe({
        next: (response) => {
          console.log("Response from API:", response);
          // Remove the item from the list after successful deletion
          this.formDataList1.splice(val, 1);
          localStorage.setItem(`${this.Entity}`, JSON.stringify(this.formDataList1));
          //this.toastr.success('Data deleted successfully!', 'Success');
        },
        error: (error) => {
          console.error("Error deleting data:", error);
          this.formDataList1.splice(val, 1);
          console.log("delete", this.formDataList1);
          localStorage.setItem(`${this.Entity}`, JSON.stringify(this.formDataList1));

          this.router.navigate(['/local-user']);
        }
      });


      console.log("avant", this.formDataList1);
      console.log("apres", this.formDataList1);
      console.log('Received data ID:', this.Id);
    });

    const modifiedName = this.dataService.getNewName();
    const modifiedTypes = this.dataService.getNewType();
    const modifiedCatecory = this.dataService.getNewCatecory();
    const modifiedCrea = this.dataService.getNewC();
    console.log("MT", modifiedTypes);
    console.log("MN", modifiedName);
    this.list = this.dataService.getList();
    console.log("nomEntity", this.list);
    this.List = this.dataService.getFormDataList();
    const storedData = localStorage.getItem(`${this.Entity}`);

    if (storedData) {
      this.formDataList1 = JSON.parse(storedData);
    }
    this.dataService.formData1$.subscribe(formData1 => {
      if (formData1) {

        this.showDeleteButton = true
        console.log("yalaa2", this.formData);
        this.formDataList2.push(formData1);

        console.log("darine", this.formDataList2);
        this.index += 1;
        console.log("index", this.index);

        this.formDataName = formData1.Name;
        this.formDataCategory = formData1.Category;
        this.formDataTypes = formData1.Types;
        this.formDataStatus = 'Inactive/Draft';
        this.formDataId = 1; // Utiliser l'identifiant unique pour l'élément
        this.formDataCreateDate = new Date().toLocaleDateString('fr-FR', {
          hour12: false,
          timeZone: 'UTC'
        });

        this.formDataCreatedBy = `Local ${this.Entity}`;

        this.showDeleteButton = true;
        //this.formvalues = formData.null;
        this.listValues.push(formData1.null);
        console.log("null", this.listValues);
        this.show = true;
        this.items.push(formData1);
        console.log("name&", this.formDataList2);

        this.formDataList2.forEach(item => {
          item.DateCreated = this.formDataCreateDate
          item.Status = "Inactive/Draft";
          item.CreatedBy = this.formDataCreatedBy;
          //item.InputValues = this.listValues;
          //console.log("wwwwwoooo", item.InputValues);
          // Ajoutez la variable `rejected` à chaque objet
        });
        console.log("name22", this.formDataList2);
        for (let i in this.formDataList) {
          const name = this.formDataList[i].Name;
          const category = this.formDataList[i].Category
          const date = this.formDataList[i].DateCreated;
          console.log("name", name);
          console.log("category", category);
          console.log("date", date)
        }

        //this.dataService.updateFormDataList(thSis.formDataList);
        //localStorage.setItem(`${this.Entity}`, JSON.stringify(this.formDataList2));
      } else {
        console.log('Aucune donnée dans formData ou formData est null.');
      }

      const conbin = this.formDataList1.concat(this.formDataList2);
      const uniqueList1 = Array.from(new Map(conbin.map(item => [item.Name, item])).values());

      // Assigner la liste unique à formDataList
      this.formDataList1 = uniqueList1;
      console.log("th", this.formDataList1);
      localStorage.setItem(`${this.Entity}`, JSON.stringify(this.formDataList1));
      this.dataService.updateFormDataList(this.formDataList);

      console.log(this.formDataList1);

      localStorage.setItem(`${this.Entity}`, JSON.stringify(this.formDataList1));
      console.log("Combined list:", this.formDataList);
    });

 

    this.formDataList1 = this.formDataList1.filter(item => item.Name);
      console.log("roro", this.formDataList1);
      if (Change) {
        this.formDataList1[id - 1].Name = modifiedName;
        this.formDataList1[id - 1].Types = modifiedTypes;
        this.formDataList1[id - 1].Category = modifiedCatecory;
        this.formDataList1[id - 1].CreatedBy = modifiedCrea;
        console.log(this.formDataList1[id - 1].Name);
      }
      localStorage.setItem(`${this.Entity}`, JSON.stringify(this.formDataList1));
      const value = this.Entity;




      this.localService.changeDataList(this.formDataList1);
      console.log("local", localStorage.value);
   

      const jsonString = localStorage.share;


      const dictionnaire = JSON.parse(jsonString);
      const nouveauDictionnaire = {};

      // Parcourir chaque clé du dictionnaire et construire un nouvel objet avec la structure souhaitée
      for (const cle in dictionnaire) {
        const nouvelleCle = cle.charAt(0) + cle.slice(1); // Mettre en majuscule la première lettre de la clé
        nouveauDictionnaire[nouvelleCle] = dictionnaire[cle];
      }

      console.log(nouveauDictionnaire);
      const keys = Object.keys(nouveauDictionnaire);
      for (let k of keys) {
        if (k == this.Entity) {
          this.ajoutList.push(nouveauDictionnaire[k]);
        }
        console.log("ajo", this.ajoutList);
      }
      const combinedList = this.formDataList1.concat(this.ajoutList);

      // Utiliser un Set pour éliminer les doublons basés sur Name
      const uniqueList = Array.from(new Map(combinedList.map(item => [item.Name, item])).values());

      // Assigner la liste unique à formDataList
      this.formDataList1 = uniqueList;

      // Mettre à jour le localStorage
      localStorage.setItem(`${this.Entity}`, JSON.stringify(this.formDataList1));
      console.log("Final Combined list:", this.formDataList1);
     
   




  }
  Reflesh() {
    this.dataService.currentItem.subscribe(item => {
      if (item) {
        const index = this.formDataList1.findIndex(data => data.Name === item.Name && data.Category === item.Category && data.Types === item.Types);
        if (index !== -1) {
          if (this.formDataList1[index].Status !== 'Approval') {
            this.formDataList1[index].Status = 'Approval';
          }
        } else {
          item.Status = 'Approval';
          this.formDataList1.push(item);
        }
        localStorage.setItem(`${this.Entity}`, JSON.stringify(this.formDataList1));
      }
    });

    this.dataService.currentItem1.subscribe(item => {
      if (item) {
        const index = this.formDataList1.findIndex(data => data.Name === item.Name && data.Category === item.Category && data.Types === item.Types);
        if (index !== -1) {
          if (this.formDataList1[index].Status !== 'Rejected') {
            this.formDataList1[index].Status = 'Rejected';
          }
        } else {
          item.Status = 'Rejected';
          this.formDataList1.push(item);
        }
        localStorage.setItem(`${this.Entity}`, JSON.stringify(this.formDataList1));
      }
    });
  }
  Update(i: number) {

    const modifiedName = this.dataService.getModifiedName();
    if (modifiedName == undefined) {
      this.formDataList[i].Name = this.formDataName;
    } else {
      this.formDataList[i].Name = modifiedName;
    }
    const modifiedCategory = this.dataService.getModifiedCategory();
    if (modifiedCategory == undefined) {
      this.formDataList[i].Category = this.formDataCategory;
    } else {
      this.formDataList[i].Category = modifiedCategory;
    }
    this.formDataList[i].Category = modifiedCategory;
    const modifiedTypes = this.dataService.getModifiedTypes();
    if (modifiedTypes == undefined) {
      this.formDataList[i].Types = this.formDataTypes;
    } else {
      this.formDataList[i].Types = modifiedTypes;
    }

    const modifiedCreated = this.dataService.getModifiedCreatedBy();
    if (modifiedCreated == undefined) {
      this.formDataList[i].CreatedBy = this.formDataCreatedBy;
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
        console.log("view", this.formDataList1[i]);
        console.log("view", this.formDataList1[i]);

        this.validservice.DeleteDataEntity(this.formDataList1[i]).subscribe({
          next: (response) => {
            console.log("Response from API:", response);
            this.formDataList1.splice(i, 1);
            localStorage.setItem('entity1', JSON.stringify(this.formDataList1));
         
          },
          error: (error) => {
            console.error("Error deleting data:", error);
            this.formDataList1.splice(i, 1);
            localStorage.setItem('entity1', JSON.stringify(this.formDataList1));
     
        
          }
        });
      }
    });

  }


  generateHTML(): string {
    let html = '';
    this.formDataList.forEach(i => {
      html += `<tr *ngFor="let i of formDataList">`;
      html += `<td class="px-4 py-3 mx-6">ddddd</td>`; 
      html += `<td class="px-4 py-3 mx-6">${i.Name}</td>`; 
      html += `<td class="px-4 py-3 mx-6">Inactive</td>`; 
      html += `<td class="px-4 py-3 mx-6">${i.Category}</td>`; // Colonne Category
      html += `<td class="px-4 py-3 mx-6">${i.Types}</td>`; // Colonne Types
      html += `<td class="px-4 py-3 mx-6"><!-- Actions --></td>`; // Colonne Actions
      html += `</tr>`;
    });
    return html;
  }


  addItemToTable(newItem: any) {
    this.items.push(newItem);
    console.log("eeee", this.items);
    console.log("sss", newItem);// Ajoutez les données saisies au tableau items
  }
  submittedDataList: any[] = [];
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogSpecComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });

  }
}
