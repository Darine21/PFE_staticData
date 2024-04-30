import { Component, OnInit } from '@angular/core';
import {  EventEmitter, Input, Output } from '@angular/core';
import { RejectDiaComponent } from '../reject-dia/reject-dia.component';
import { MatDialog } from '@angular/material/dialog';
import { ValidDiaComponent } from '../valid-dia/valid-dia.component';
import { Console } from 'console';
import { SelectedItemService } from '../communiation.service';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommentDialogComponent } from './dialogue/dialogue.component';
@Component({
  selector: 'app-card-rejected',
  templateUrl: './card-rejected.component.html',
  styleUrls: ['./card-rejected.component.scss']
})
export class CardRejectedComponent implements OnInit {
  data: any[] = [];
  filteredData: any[];
  items: any[] = [
    {
      id: 1,
      name: "currency",
      status: "Rejected",
      category: "Category 1",
      types: ["global"],
      createDate: "2022-04-20",
      createdBy: "User 1",
      checked: false // Ajoutez une propriété pour la case à cocher
    },
    {
      id: 1,
      name: "Conutry",
      status: "Rejected",
      category: "Category 4",
      types: ["global"],
      createDate: "2022-04-20",
      createdBy: "User 4",
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
  panelOpenState = false;
  @Output() itemNameChange: EventEmitter<string> = new EventEmitter<string>();
  constructor(private dialog: MatDialog, private selectedItemService: SelectedItemService, private router: Router) { }
  logName(name: string) {
    console.log("Name clicked:", name);
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '550px',
      data: { comment: 'The static data lacks consistency across various characteristics' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fermé');
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
    // Mettre à jour le drapeau en fonction de l'état de la sélection
    this.isItemSelected = this.items.some(item => item.checked);
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

  goTVal() {
    // Naviguer vers la page de détails en utilisant l'ID de l'élément
    this.router.navigate(['/valide']);
  }
  go
  ngOnInit(): void {
  }

}


