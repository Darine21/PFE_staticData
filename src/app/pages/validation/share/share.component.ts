import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectedItemService } from '../communiation.service';
import { ValidDiaComponent } from '../valid-dia/valid-dia.component';
import { RejectDiaComponent } from '../reject-dia/reject-dia.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  selectedItemName: string = '';
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
  showRejectDialog: boolean = false;
  // selectedItemName: string = '';
  showFirstDialog: boolean = false;
  showConfirmationDialog: boolean = true;
  dataName: string = '';
  isItemSelected: boolean = false;
 
  @Output() itemNameChange: EventEmitter<string> = new EventEmitter<string>();
  constructor(private dialog: MatDialog, private selectedItemService: SelectedItemService) { }

  logName(name: string) {
    console.log("Name clicked:", name);
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
 

  ngOnInit(): void {
    this.selectedItemService.selectedItem$.subscribe(name => {
      this.selectedItemName = name;
    });
  }

}



