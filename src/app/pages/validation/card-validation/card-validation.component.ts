
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RejectDiaComponent } from '../reject-dia/reject-dia.component';
import { MatDialog } from '@angular/material/dialog';
import { ValidDiaComponent } from '../valid-dia/valid-dia.component';
import { Console } from 'console';
import { SelectedItemService } from '../communiation.service';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { StaticService } from '../../static/static.service';
import { DataService } from '../../static/data.service';
import { ValidService } from '../validation.service';
@Component({
  selector: 'app-card-validation',
  templateUrl: './card-validation.component.html',
  styleUrls: ['./card-validation.component.scss']
})
export class CardValidationComponent implements OnInit {
  data: any[] = [];
  filteredData: any[];
  items: any[] = [
    {
      id: 1,
      name: "currency",
      status: "Inactive",
      category: "Category 1",
      types: ["global"],
      createDate: "2022-04-20",
      createdBy: "User 1",
      checked: false // Ajoutez une propriété pour la case à cocher
    },
    {
      id: 2,
      name: "loan type",
      status: "Inactive",
      category: "Category 6",
      types: ["global"],
      createDate: "2022-05-20",
      createdBy: "User 3",
      checked: false // Ajoutez une propriété pour la case à cocher
    },
    {
      id: 3,
      name: "interest rate",
      status: "Inactive",
      category: "Category 4",
      types: ["global"],
      createDate: "2022-04-2",
      createdBy: "User 2",
      checked: false,
      isSelected: false// Ajoutez une propriété pour la case à cocher
    },

    // Ajoutez plus d'exemples si nécessaire
  ];
  formDataList: any[] = []; 
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  showRejectDialog: boolean = false;
  // selectedItemName: string = '';
  showFirstDialog: boolean = false;
  showConfirmationDialog: boolean = true;
  dataName: string = '';
  isItemSelected: boolean = false;
  @Input() selectedItemName: string = '';
  @Output() itemNameChange: EventEmitter<string> = new EventEmitter<string>();
    selectedItemID: any;
    checked: boolean;
    
    showValidDialog: any;
  StatusList: any[] = [];
    toastr: any;
  constructor(private dialog: MatDialog, private valiservice: ValidService, private dataservice: DataService, private selectedItemService: SelectedItemService, private router: Router) { }

  logName(name: string) {
    console.log("Name clicked:", name);
  }



  openDialog(): void {
    //this.showRejectDialog = true;
    const dialogRef = this.dialog.open(RejectDiaComponent, {
      width: '500px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  updateSelectedItemName(name: string): void {
    this.selectedItemService.updateSelectedItem(name);
  }
  valider(item: any) {
    // Ouvrir le dialogue
    const dialogRef = this.dialog.open(ValidDiaComponent);


    // Gérer la réponse du dialogue
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'publish') {
        // Si l'utilisateur a cliqué sur "Publisher"
        // Effectuer les actions nécessaires pour publier la donnée
        console.log('Published');
      } else {
        // Si l'utilisateur a cliqué sur "Cancel" ou a fermé le dialogue
        console.log('Cancelled');
      }
    });
   
  }
  selectedItemCount: number = 0;
  // Méthode pour gérer le changement de la case à cocher
  onCheckboxChange(item: any) {

    // Désélectionner tous les autres éléments
    this.items.forEach((el) => {
      el.isSelected = (el === item && !el.isSelected); // Sélectionner uniquement l'élément cliqué
    });
    let alreadySelected = item.isSelected;
    console.log("sss", item.isSelected)
   
    const previousState = !item.isSelected;
    if (previousState) {
      // Si la case était précédemment cochée, décrémenter le compteur
      this.selectedItemCount--;
    } else {
      // Sinon, incrémenter le compteur
      this.selectedItemCount++;
    }
    
    console.log("before:", this.selectedItemCount);
    item.isSelected = !item.isSelected;
     // Mettre à jour le nombre d'éléments sélectionnés
    console.log("after:", this.selectedItemCount);
  }

  rejectAll() {
    const selectedItems = this.items.filter(item => item.isSelected);
    selectedItems.forEach(item => this.rejeter(item)); // Appeler la méthode rejeter() pour chaque élément sélectionné
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

  goToVal() {
    // Naviguer vers la page de détails en utilisant l'ID de l'élément
    this.router.navigate(['/valide']);
  }

  formDataName: string;
  formDataCategory: string;
  formDataTypes: string;
  formDataStatus: string;
  formDataId: number;
  formDataCreateDate: Date;
  formDataCreatedBy: string;
  showDeleteButton: Boolean = false;
  showShareOptions: boolean = false;
  formvalues: string[] = [];
  formDataNameList: string[] = [];
  selectedVersion: number;
  submittedDataList: any[] = [];
  values: string;
  goToDiaReject() { this.router.navigate(['/reject-dia']); }
  goToReject() { this.router.navigate(['/rejected']); }
  ngOnInit(): void {
   
    this.showRejectDialog = false;
    this.selectedItemID = this.dataservice.getSelectedItemID();
    console.log('selectedItemID:', this.selectedItemID);
    this.submittedDataList = this.dataservice.submittedDataList;
    console.log("listtt", this.submittedDataList);
    
    this.submittedDataList.forEach(item => {
      item.showRejectDialog = this.showRejectDialog;
      item.showValidDialog = this.showValidDialog;// Ajoutez la variable `rejected` à chaque objet
    });
    console.log("rejectttttteeeee", this.submittedDataList[0].showRejectDialog);
    console.log("validdddddtttttteeeee", this.submittedDataList[0].showValidDialog);
    console.log("validdddddvvvvtttttteeeee", this.submittedDataList[0].InputValues);
    for (let i = 0; i < this.submittedDataList.length; i++) {
      this.formDataName = this.submittedDataList[i].Name;
      this.formDataNameList.push(this.formDataName);

      console.log("etat", this.StatusList);
      console.log("paaaaar", this.formDataName);
    }
    // Récupérez les données transmises depuis la page précédente
    this.formDataName = this.submittedDataList[0].Name;
    console.log("par", this.formDataName);
    this.formDataCategory = this.submittedDataList[0].Category;
    this.formDataTypes = this.submittedDataList[0].Types;
    // Ajoutez d'autres propriétés si nécessaire
    console.log("par", this.formDataName);
    // Vous pouvez ensuite utiliser ces données comme vous le souhaitez dans votre composant

  }
  


  // Fonction pour ouvrir le dialogue de rejet pour un élément spécifique
  openRejectDialog(item: any) {
    item.showRejectDialog = true;
  }

  // Fonction pour fermer le dialogue de rejet pour un élément spécifique
  closeRejectDialog(item: any) {
    item.showRejectDialog = false;
  }
  getNumberOfDaysFromDate(dateString: string): number {
    const currentDate = new Date();
    const createDate = new Date(dateString);
    const differenceInTime = currentDate.getTime() - createDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    console.log("Jours ", differenceInDays);
    return Math.floor(differenceInDays);

  }

  onClose() {

    this.showFirstDialog = false;
   
  }
}

