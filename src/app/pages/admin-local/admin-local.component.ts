import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DialogSpecComponent } from '../admin-local/dialog-spec/dialog-spec.component';
import { Router } from '@angular/router';
import { StaticData } from '../models/staticdata';
import { FormsModule } from '@angular/forms';
//import { StaticService } from './static.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../static/data.service';
import { StaticService } from '../static/static.service';
import { EntityLocal } from '../models/EntityLocal';
import { ValidService } from '../validation/validation.service';
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


  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

  constructor(private dialog: MatDialog, private router: Router, private toastr: ToastrService, private dataService: DataService, private staticService: StaticService, private validservice: ValidService) {


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
  List : any [] = [];
  ngOnInit(): void {
    this.list = this.dataService.getList();
    console.log("nomEntity", this.list);
    this.List = this.dataService.getFormDataList();
    const storedData = localStorage.getItem('entity1');

    if (storedData) {
      this.formDataList1 = JSON.parse(storedData);
    }
    this.dataService.formData1$.subscribe(formData1 => {
      if (formData1) {

        this.showDeleteButton = true
        console.log("yalaa2", this.formData);
        this.formDataList1.push(formData1);
       
        console.log("darine", this.formDataList1);
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
        this.formDataCreatedBy = 'Local';
        this.showDeleteButton = true;
        //this.formvalues = formData.null;
        this.listValues.push(formData1.null);
        console.log("null", this.listValues);
        this.show = true;
        this.items.push(formData1);
        console.log("name&", this.formDataList1);

        this.formDataList1.forEach(item => {
          item.DateCreated = new Date();
          item.Status = "Inactive/Draft";
          item.CreatedBy = this.formDataCreatedBy;
          //item.InputValues = this.listValues;
          //console.log("wwwwwoooo", item.InputValues);
          // Ajoutez la variable `rejected` à chaque objet
        });
        console.log("name22", this.formDataList1);
        for (let i in this.formDataList) {
          const name = this.formDataList[i].Name;
          const category = this.formDataList[i].Category
          const date = this.formDataList[i].DateCreated;
          console.log("name", name);
          console.log("category", category);
          console.log("date", date)
        }
        
        //this.dataService.updateFormDataList(thSis.formDataList);
        localStorage.setItem('entity1', JSON.stringify(this.formDataList1));
      } else {
        console.log('Aucune donnée dans formData ou formData est null.');
      }
      console.log("roro", this.formDataList1);
     
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

    console.log("satticc", this.formDataList1[i])
    this.validservice.DeleteDataEntity(this.formDataList1[i]).subscribe({
      next: (response) => {
        console.log("Response from API:", response);
        this.toastr.success('Data deleted successfully!', 'Success');
      },
      error: (error) => {
        this.formDataList.splice(i, 1);
        localStorage.setItem('entity1', JSON.stringify(this.formDataList1));
        console.error("Error deleting data:", error);
        this.toastr.error('Failed to delete data!', 'Error');
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
