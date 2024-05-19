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
import { StaticService } from '../static/static.service';
import { StaticData } from '../models/staticdata';
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
  showValidDialog: boolean = false;
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
  reasonsList: { itemId: string, reason: any , status:string }[] = [];
  reason: string='';
  notif: any[] = [];
  StatusList: any[]=[];
    dataE: any;
    Status: any;

  constructor(private navbarService: NavbarService, private dialog: MatDialog, private route: ActivatedRoute, private selectedItemService: SelectedItemService, private dataService: DataService, private router: Router, private staticservice: StaticService) { }
  @Output() statusUpdate: EventEmitter<string> = new EventEmitter<string>();

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
      this.showRejectDialog = false;
      
    });
  }
  updateSelectedItemName(name: string): void {
    this.selectedItemService.updateSelectedItem(name);
  }
  valider(item: any) {
    item.showValidDialog = true;
    console.log("ddd", item.Name);
    this.staticservice.ValidateStaticData(item.Name).subscribe(
      (response) => {
        console.log('Validation successful:', response);
        item.showValidDialog = false;
        item.Status = 'Approval';

      },
      (error) => {
        console.error('Validation failed:', error);
      }
    );
  
    this.StatusList.push("Approval");
    console.log("status", this.StatusList);
    this.navbarService.changeStatus(this.StatusList);

    const dialogRef = this.dialog.open(ValidDiaComponent);


    // Gérer la réponse du dialogue
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'publish') {

        console.log('Published');
      } else {
        // Si l'utilisateur a cliqué sur "Cancel" ou a fermé le dialogue
        console.log('Cancelled');
      }
    });
    this.updateSubmittedDataList();

  }
  // Méthode pour gérer le changement de la case à cocher
  onCheckboxChange(checked: boolean, item: any) {
    item.checked = checked;
    console.log("item", item.checked);
    // Mettre à jour le drapeau en fonction de l'état de la sélection
    this.isItemSelected = this.items.some(item => item.checked);
    console.log("item2", this.isItemSelected);
  }

 
  status1: any;
  rejeter(item: any) {
    this.isItemSelected=true
    item.showRejectDialog = true;
    this.StatusList.push("Rejected");
    console.log("status", this.StatusList);
    this.navbarService.changeStatus(this.StatusList);
    this.reasonsList.push({ itemId: item.Name, reason: this.notif, status:"Rejected" });
    
    console.log("lisstaaa", this.reasonsList);
    this.updateSubmittedDataList();

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
  updateStatus2(newStatus: string , item:any) {
    // Parcourir le tableau items
   
      // Vérifier si l'élément correspond à celui rejeté
      if (item.Status === "Inactive/Draft") {
        // Mettre à jour le statut de l'élément rejeté
        item.Status = newStatus;
      }
  
  }

  updateStatus(newStatus: string , item : any) {

    console.log("vali", this.showValidDialog);
      // Vérifier si l'élément correspond à celui rejeté
    if (item.formDataStatus === "Inactive/Draft" || item.formDataStatus === "Approval") {
        // Mettre à jour le statut de l'élément rejeté
        item.formDataStatus = newStatus;
      console.log("New status:", item.formDataStatus);
      this.StatusList.push(item.formDataStatus);
      console.log("etat",this.StatusList);
      }
  
  }
  goToValid() { this.router.navigate(['/card-val']); }
  goTShare() {

    this.router.navigate(['/complaint']);
  }

  formDataNameList: string[] = [];
  goToReject() { this.router.navigate(['/rejected']); }
  goToCardS() { this.router.navigate(['/card-share']); }
  ngOnInit(): void {

        this.navbarService.reason$.subscribe(reason => {
      this.notif.push(reason);
      console.log('Validation:', this.notif);
    });


   
      this.submittedDataList = this.dataService.submittedDataList;
      console.log("Liste initiale:", this.submittedDataList);
    
      this.submittedDataList.forEach(item => {
        item.showRejectDialog = this.showRejectDialog;
        item.showValidDialog = this.showValidDialog;
      });
  

   // localStorage.setItem('submittedDataList', JSON.stringify(this.submittedDataList));

    for (let i = 0; i <this.submittedDataList.length; i++) {
      this.formDataName = this.submittedDataList[i].Name;
      this.formDataNameList.push(this.formDataName);

     
      console.log("paaaaar", this.formDataName);
    }
    
   
    this.navbarService.changeName(this.formDataNameList);

    
    // Récupérez les données transmises depuis la page précédente
    this.formDataName = this.submittedDataList[0].Name;
    console.log("par", this.formDataName);
    this.formDataCategory = this.submittedDataList[0].Category;
    this.formDataTypes = this.submittedDataList[0].Types;
    // Ajoutez d'autres propriétés si nécessaire
    console.log("par", this.formDataName);
 
  
  }
  updateSubmittedDataList() {
    // Mettre à jour submittedDataList dans le service DataService
    this.dataService.submittedDataList = this.submittedDataList;
    // Sauvegarder submittedDataList dans localStorage
    localStorage.setItem('submittedDataList', JSON.stringify(this.submittedDataList));
  }

 }

