import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ConfirmationDialogComponent } from '../../static/confirmation-dialog/confirmation-dialog.component';

import { ToastrService } from 'ngx-toastr';
import { StaticService } from '../../static/static.service';

import { NavbarService } from '../../../components/NavBar.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../static/data.service';
import { ShareDialogComponent } from '../../validation/share/share.component';
import { ValidService } from '../../validation/validation.service';
import { SelectedItemService } from '../../validation/communiation.service';
import { RejectDiaComponent } from '../../validation/reject-dia/reject-dia.component';
import { ValidDiaComponent } from '../../validation/valid-dia/valid-dia.component';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-validation-local',
  
  templateUrl: './validation-local.component.html',
  styleUrls: ['./validation-local.component.scss']
})
export class ValidationLocalComponent {
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
  reasonsList: { itemId: string, reason: any, status: string }[] = [];
  reason: string = '';
  notif: any[] = [];
  StatusList: any[] = [];
  dataE: any;
  Status: any;

  constructor(private locale: LocalService , private staticdata: StaticService, private toastr: ToastrService, private validedata: ValidService, private navbarService: NavbarService, private dialog: MatDialog, private route: ActivatedRoute, private selectedItemService: SelectedItemService, private dataService: DataService, private router: Router, private staticservice: StaticService) { }
  @Output() statusUpdate: EventEmitter<string> = new EventEmitter<string>();
  openShareDialog() {

    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: '600px', // Customize the width as needed
      autoFocus: false, // Prevent autofocus on the first input
      panelClass: 'custom-dialog-container' // Custom class for additional styling
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle after close
    });
  }
  logName(name: string) {
    console.log("Name clicked:", name);
  }

  delete(name: string, i: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    console.log("zzz");
    this.dataService.confirm$.subscribe(result => {

      if (result) {
        console.log("view", name);
        console.log(this.submittedDataList);


        this.validedata.DeleteValideStaticData(name).subscribe({
          next: (response) => {
            console.log("Response from API:", response);
            // Remove the item from the list after successful deletion
            this.submittedDataList.splice(i, 1);
            console.log("apres", this.submittedDataList);
            //localStorage.setItem('', JSON.stringify(this.submittedDataList));
            this.toastr.success('Data deleted successfully!', 'Success');
          },
          error: (error) => {

            console.log("eeeee");
            console.error("Error deleting data:", error);
            this.submittedDataList.splice(i, 1);
            localStorage.setItem('ValidData', JSON.stringify(this.submittedDataList));
            this.toastr.error('Failed to delete data!', 'Error');
            this.router.navigate(['/valide']);
          }
        });
      }
    });

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
    this.selectedItemService.changeName(item.Name);
    console.log("ittem", item);
    this.selectedItemService.shareitem(item);
    this.dataService.changeItem(item);
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
    this.isItemSelected = true
    item.showRejectDialog = true;
    this.StatusList.push("Rejected");
    console.log("status", this.StatusList);
    this.navbarService.changeStatus(this.StatusList);
    this.reasonsList.push({ itemId: item.Name, reason: this.notif, status: "Rejected" });

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
  updateStatus2(newStatus: string, item: any) {
    // Parcourir le tableau items

    // Vérifier si l'élément correspond à celui rejeté
    if (item.Status === "Inactive/Draft") {
      // Mettre à jour le statut de l'élément rejeté
      item.Status = newStatus;
    }

  }

  updateStatus(newStatus: string, item: any) {

    console.log("vali", this.showValidDialog);
    // Vérifier si l'élément correspond à celui rejeté
    if (item.formDataStatus === "Inactive/Draft" || item.formDataStatus === "Approval") {
      // Mettre à jour le statut de l'élément rejeté
      item.formDataStatus = newStatus;
      console.log("New status:", item.formDataStatus);
      this.StatusList.push(item.formDataStatus);
      console.log("etat", this.StatusList);
    }

  }
  goToValid() { this.router.navigate(['/card-val']); }
  goTShare() {

    this.router.navigate(['/complaint']);
  }

  formDataNameList: string[] = [];
  goToDetailsV(id: number) {


    const item = id;
    console.log("iiii", item);
    this.dataService.setSelectedItemID(item)
    this.router.navigate(['/detailsV', id]);
  }
  goToReject() { this.router.navigate(['/rejected']); }
  goToCardS() { this.router.navigate(['/card-share']); }
  showShare: boolean = false;
  list: any[];
  Entity: string;
  ngOnInit(): void {
    this.locale.currentEntity1.subscribe(entity => {
      this.Entity = entity;
      console.log("Entity value in other page:", entity);
      // Utilisez la valeur de l'entité comme bon vous semble dans cette page
    });
    const storedData = this.selectedItemService.getItem(`${this.Entity}`);
    if (storedData) {
      this.submittedDataList = storedData;
    } else {
      this.submittedDataList = this.dataService.submittedDataList1;
    }
    this.selectedItemService.currentvalide.subscribe(name => {
      this.showShare = name;
      console.log("name", this.showShare);
    });
    this.navbarService.reason$.subscribe(reason => {
      this.notif.push(reason);
      console.log('Validation:', this.notif);
    });



    this.submittedDataList = this.dataService.submittedDataList1;
    this.list = this.submittedDataList;

    console.log("Liste initiale:", this.list);
    this.updateSubmittedDataList();
    this.list.forEach(item => {
      item.showRejectDialog = this.showRejectDialog;
      item.showValidDialog = this.showValidDialog;
    });


    // localStorage.setItem('submittedDataList', JSON.stringify(this.submittedDataList));

    for (let i = 0; i < this.submittedDataList.length; i++) {
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
    this.dataService.submittedDataList = this.submittedDataList;
    localStorage.setItem(`${this.Entity}`, JSON.stringify(this.submittedDataList));
  }
}



