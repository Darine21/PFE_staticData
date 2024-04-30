
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RejectDiaComponent } from '../reject-dia/reject-dia.component';
import { MatDialog } from '@angular/material/dialog';
import { ValidDiaComponent } from '../valid-dia/valid-dia.component';
import { Console } from 'console';
import { SelectedItemService } from '../communiation.service';
import Chart from 'chart.js';
import { Router } from '@angular/router';
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
  constructor(private dialog: MatDialog, private selectedItemService: SelectedItemService, private router: Router) { }

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
  goToDiaReject() { this.router.navigate(['/reject-dia']); }
  goToReject() { this.router.navigate(['/rejected']); }
  ngOnInit(): void {
    this.showRejectDialog = false;

  }
  // Fonction pour ouvrir le dialogue de rejet pour un élément spécifique
  openRejectDialog(item: any) {
    item.showRejectDialog = true;
  }

  // Fonction pour fermer le dialogue de rejet pour un élément spécifique
  closeRejectDialog(item: any) {
    item.showRejectDialog = false;
  }
  onClose() {

    this.showFirstDialog = false;
   
  }
}

