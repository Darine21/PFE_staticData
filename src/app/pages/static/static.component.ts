import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from './dialogue/dialogue.component';
import { Router } from '@angular/router';
import { StaticData } from '../models/staticdata';
import { FormsModule } from '@angular/forms';
//import { StaticService } from './static.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './data.service';
import { StaticService } from './static.service';
//import { BsModalRef } from 'ngx-bootstarp/modal';
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
    listValues: string[]=[];
  

  deleteItem(index: number) {
    this.items.splice(index, 1); 
  }

  constructor(private dialog: MatDialog, private router: Router, private toastr: ToastrService, private dataService: DataService, private staticService: StaticService) {


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
  ngOnInit(): void {
    const storedData = localStorage.getItem('staticData');
    if (storedData) {
      this.formDataList = JSON.parse(storedData);
    }
    this.dataService.formData$.subscribe(formData => {
      if (formData) {

        this.showDeleteButton = true
        console.log("yalaa2", this.formData);
        this.formDataList.push(formData);
        localStorage.setItem('staticData', JSON.stringify(this.formDataList));
        console.log("darine", this.formDataList);
        this.index += 1;
        console.log("index", this.index);
       
        this.formDataName = formData.Name;
        this.formDataCategory = formData.Category;
        this.formDataTypes = formData.Types;
        this.formDataStatus = 'Inactive/Draft';
        this.formDataId = 1; // Utiliser l'identifiant unique pour l'élément
        this.formDataCreateDate = new Date().toLocaleDateString('fr-FR', {
          hour12: false,
          timeZone: 'UTC'
        });
        this.formDataCreatedBy = 'name';
        this.showDeleteButton = true;
        //this.formvalues = formData.null;
        this.listValues.push(formData.null);
       
        this.show = true;
        this.items.push(formData);
        console.log("name&", this.formDataList);
    
        this.formDataList.forEach(item => {
          item.DateCreated = new Date();
          item.Status = "Inactive/Draft";
          item.CreatedBy = this.formDataCreatedBy;
          item.InputValues = this.listValues;
          console.log("wwwwwoooo", item.InputValues);
        // Ajoutez la variable `rejected` à chaque objet
        });
        console.log("name22", this.formDataList);
        for (let i in this.formDataList) {
          const name = this.formDataList[i].Name;
          const category = this.formDataList[i].Category
          const date = this.formDataList[i].DateCreated;
          console.log("name", name);
          console.log("category", category);
          console.log("date", date)
        }
        
        this.dataService.formDataList$.subscribe(formData => {
          this.formDataList = formData;
        });
        //this.dataService.updateFormDataList(this.formDataList);

      } else {
        console.log('Aucune donnée dans formData ou formData est null.');
      }
      this.dataService.updateFormDataList(this.formDataList);
    });
    
    
  
    
  }
  
  incrementIndex() {
    this.i++;
  }

  delete(i : number) {
 

    this.staticService.DeleteStaticData(this.formDataList[i]).subscribe({
      next: (response) => {
        console.log("Response from API:", response);
        this.toastr.success('Data deleted successfully!', 'Success');
      },
      error: (error) => {
        this.formDataList.splice(i, 1);
        localStorage.setItem('staticData', JSON.stringify(this.formDataList));
        console.error("Error deleting data:", error);
        this.toastr.error('Failed to delete data!', 'Error');
      }
    });
  }



  generateHTML(): string {
    let html = '';
    this.formDataList.forEach( i => {
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
      if (result) {
        
      }
    });
   
  }
}
