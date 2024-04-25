import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from './dialogue/dialogue.component';
import { Router } from '@angular/router';
import { StaticData } from '../models/staticdata';
import { FormsModule } from '@angular/forms';
import { StaticService } from './static.service';
import { ToastrService } from 'ngx-toastr';
//import { BsModalRef } from 'ngx-bootstarp/modal';
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
    {
      id: 1,
      name: "currency",
      status: "Inactive",
      category: "null",
      types: ["null"],
      createDate: "2022-04-20",
      createdBy: "null",
      checked: false // Ajoutez une propriété pour la case à cocher
    },
    // Ajoutez plus d'exemples si nécessaire
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
  deleteItem(index: number) {
    this.items.splice(index, 1); // Supprime l'élément du tableau à l'index donné
  }
  
  addItemToTable(newItem: any) {
    this.items.push(newItem); // Ajoutez les données saisies au tableau items
  }

  constructor(private dialog: MatDialog, private dialogue: StaticService, private router: Router, private toastr: ToastrService) {  }
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
  populateForm(pd: StaticData) {
    this.dialogue.formData = Object.assign({}, pd);
  }
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.dialogue.DeleteStaticData(Id)
        .subscribe(res => {
          debugger;
          this.dialogue.refreshList();
          this.toastr.warning('Deleted successfully', 'Payment Detail Register');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }

  addStaticData(model: StaticData) {
    this.staticService.addStaticData(model).subscribe( {
      next: (response) => {
          
          //this.sharedService.showNotification(true , response.valueOf.title, response.value.message);
          //this.router.navigate(['/account/login']);
          console.log(response);

        },
        error: error => {
          if (error.error.Errors) {
            this.errorMessages = error.error.Errors;
          }
          console.log(error);
        }, // Rafraîchir les données après l'ajout
    });
  }
  ngOnInit() {
    this.dialogue.refreshList();
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
  }
}
