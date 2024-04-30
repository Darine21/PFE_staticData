import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from './dialogue/dialogue.component';
import { Router } from '@angular/router';
import { StaticData } from '../models/staticdata';
import { FormsModule } from '@angular/forms';
//import { StaticService } from './static.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './data.service';
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
  standalone: true,
})
export class StaticComponent {
  data: any[] = [];
  filteredData: any[];
  items: any[] = [
  ];
  //modalRef?: BsModalRef;
  item: StaticData[] = [];
  showRejectDialog: boolean = false;
  SDtoDelete: StaticData | undefined;
  showFirstDialog: boolean = false;
  showConfirmationDialog: boolean = true;
  dataName: string = '';
  isItemSelected: boolean = false;
  staticService: any;
  errorMessages: any;
  formData: any[] = [];
    Name: any;
    Category: any;
    Types: any;
    Status: any;
    ID: any;
    CreateDate: any;
  CreatedBy: any;
  submitButtonClicked: boolean = false;
  

  deleteItem(index: number) {
    this.items.splice(index, 1); // Supprime l'élément du tableau à l'index donné
  }

  addItemToTable(newItem: any) {
    this.items.push(newItem); // Ajoutez les données saisies au tableau items
  }

  constructor(private dialog: MatDialog,  private router: Router, private toastr: ToastrService, private dataService: DataService) {


  }

  // Méthode pour gérer le changement de la case à cocher
  onCheckboxChange(checked: boolean, item: any) {
    item.checked = checked;
    // Mettre à jour le drapeau en fonction de l'état de la sélection
    this.isItemSelected = this.items.some(item => item.checked);
  }
  goToDetails(id: number) {
    // Naviguer vers la page de détails en utilisant l'ID de l'élément
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
      if (item.status === "Inactive") {
        // Mettre à jour le statut de l'élément rejeté
        item.status = newStatus;
      }
    });
  }
 

  addStaticData(model: StaticData) {
    this.staticService.addStaticData(model).subscribe({
      next: (response) => {
        console.log(response);
        // Gérer la réponse en fonction de vos besoins
      },
      error: (error) => {
        console.log(error);
        // Gérer les erreurs en fonction de vos besoins
      },
    });
  }

  // Déclarez vos variables ici
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
    this.submitButtonClicked = true;
    // S'abonner à formData$ pour recevoir les mises à jour des données du service
    this.dataService.formData$.subscribe(formData => {
      if (formData) {
        console.log('Données reçues dans StaticComponent :', formData);
       
        if (formData) {
    

          this.formDataName = formData.Name;
          //console.log("bellah", this.formDataName);
          this.formDataCategory = formData.Category;
          this.formDataTypes = formData.Types;
          this.formDataStatus = 'Inactive';
          this.formDataId = 1;
          this.formDataCreateDate = new Date().toLocaleDateString('fr-FR', {
            hour12: false,
            timeZone: 'UTC' 
          });
          this.formDataCreatedBy = 'name';
          this.showDeleteButton = true;
          this.formvalues = formData.null;
          console.log("showDeleteButton:", this.showDeleteButton);
        } else {
          console.log('Aucune donnée dans formData ou formData est null.');
        }
      }
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogsComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Vérifie si des données ont été émises depuis le dialogue
        this.addItemToTable(result); // Ajoutez les données émises à votre tableau items
      }
    });
    this.submitButtonClicked = true;

  }
}
