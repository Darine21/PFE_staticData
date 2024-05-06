import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RejectDiaComponent } from './reject-dia/reject-dia.component';
import { MatDialog } from '@angular/material/dialog';
import { ValidDiaComponent } from './valid-dia/valid-dia.component';
import { Console } from 'console';
import { SelectedItemService } from './communiation.service';
import Chart from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../static/data.service';
import { NavbarService } from '../../components/NavBar.service';
@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
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
    }
   
    // Ajoutez plus d'exemples si nécessaire
  ];
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
  formDataName: string;
  formDataCategory: string;
  formDataTypes: string;
  formDataStatus: string;
  formDataId: number;
  formDataCreateDate: String;
  formDataCreatedBy: string;
  showDeleteButton: Boolean = false;
  showShareOptions: boolean = false;
  formvalues: string;
    formData: any;
  submittedDataList: any[];
  rejected: boolean = false;
  reasonsList: { itemId: string, reason: string }[] = [];
    reason: string='';
  constructor(private navbarService: NavbarService,private dialog: MatDialog, private route: ActivatedRoute, private selectedItemService: SelectedItemService, private dataService: DataService, private router : Router ) { }
 
  logName(name: string) {
    console.log("Name clicked:", name);
  }
 
  

  openDialog(): void {
    this.showRejectDialog = true;
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
  // Méthode pour gérer le changement de la case à cocher
  onCheckboxChange(checked: boolean, item: any) {
    item.checked = checked;
    console.log("item", item.checked);
    // Mettre à jour le drapeau en fonction de l'état de la sélection
    this.isItemSelected = this.items.some(item => item.checked);
    console.log("item2", this.isItemSelected);
  }

 
  // Méthode pour gérer l'action de rejet
  rejeter(item: any) {
    this.isItemSelected=true
    item.showRejectDialog = true;
    
      // Afficher la boîte de dialogue pour saisir le reason
      // Une fois que le reason est saisi et envoyé, ajoutez-le à la liste globale
    this.reasonsList.push({ itemId: item.formDataName, reason: this.reason });
    console.log("lisstaaa", this.reasonsList);
   

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
  updateStatus2(newStatus: string) {
    // Parcourir le tableau items
    this.submittedDataList.forEach(item => {
      // Vérifier si l'élément correspond à celui rejeté
      if (item.formDataStatus === "Inactive/Draft") {
        // Mettre à jour le statut de l'élément rejeté
        item.formDataStatus = newStatus;
      }
    });
  }

  updateStatus(newStatus: string , item : any) {
    // Parcourir le tableau items
    
      // Vérifier si l'élément correspond à celui rejeté
      if (item.formDataStatus === "Inactive/Draft") {
        // Mettre à jour le statut de l'élément rejeté
        item.formDataStatus = newStatus;
      }
  
  }
  goToValid() { this.router.navigate(['/card-val']); }
  goTShare() {
    // Naviguer vers la page de détails en utilisant l'ID de l'élément
    this.router.navigate(['/complaint']);
  }
  formDataNameList: string[] = [];
  goToReject() { this.router.navigate(['/rejected']); }
  goToCardS() { this.router.navigate(['/card-share']); }
  ngOnInit(): void {
    this.submittedDataList = this.dataService.submittedDataList;
    console.log("listtt", this.submittedDataList);
    this.submittedDataList.forEach(item => {
      item.showRejectDialog = this.showRejectDialog; // Ajoutez la variable `rejected` à chaque objet
    });
    console.log("rejectttttteeeee", this.submittedDataList[0].showRejectDialog);
    for (let i = 0; i < this.submittedDataList.length; i++) {
      this.formDataName = this.submittedDataList[i].formDataName;
      this.formDataNameList.push(this.formDataName);
      console.log("paaaaar", this.formDataName);
    }
    this.navbarService.changeName(this.formDataNameList); 
    // Récupérez les données transmises depuis la page précédente
    this.formDataName = this.submittedDataList[0].formDataName;
    console.log("par", this.formDataName);
    this.formDataCategory = this.submittedDataList[0].formDataCategory;
    this.formDataTypes = this.submittedDataList[0].formDataTypes;
    // Ajoutez d'autres propriétés si nécessaire
    console.log("par", this.formDataName);
    // Vous pouvez ensuite utiliser ces données comme vous le souhaitez dans votre composant
  
}

  
 }

