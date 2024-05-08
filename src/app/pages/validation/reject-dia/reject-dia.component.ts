import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ReasonDialogComponent } from './reason-dialog/reason-dialog.component';
import { NavbarService } from '../../../components/NavBar.service';
import { DataService } from '../../static/data.service';

@Component({
  selector: 'app-reject-dia',
  templateUrl: './reject-dia.component.html',
  styleUrls: ['./reject-dia.component.scss']
})
export class RejectDiaComponent implements OnInit {
  showFirstDialog: boolean = true;
  showSecondDialog: boolean = false;
  dataName: string = '';
  inputValues: string[] = [''];
  showRejectDialog: boolean = false;
  showCreateButton: boolean = true; // Contrôle la visibilité du bouton Create
  showExportButton: boolean = true; // Contrôle la visibilité du bouton Export
  items: any[] = [
    {
      id: 1,
      name: "Example 1",
      status: "Inactive/Draft",
      category: "Category 1",
      types: ["global"],
      createDate: "2022-04-20",
      createdBy: "User 1",
      checked: false // Ajoutez une propriété pour la case à cocher
    },
    {
      id: 2,
      name: "Example 2",
      status: "Inactive/Draft",
      category: "Category 2",
      types: ["global"],
      createDate: "2022-04-21",
      createdBy: "User 2",
      checked: false // Ajoutez une propriété pour la case à cocher
    },
    // Ajoutez plus d'exemples si nécessaire
  ];
  modalRef: any;
    submittedDataList: any[]=[];
  constructor(private modalService: NgbModal, private navbarService: NavbarService, private dataService: DataService) { } onNext() {
    this.showFirstDialog = false;
    this.showSecondDialog = true;
  }
  @Output() statusUpdate: EventEmitter<string> = new EventEmitter<string>();
  showReasonInput: boolean = false;
  rejectReason: string = '';
  openSecondDialog() {
    // Autres logiques nécessaires
    this.statusUpdate.emit('Rejected');
  }
  onYesClick(): void {
    this.showReasonInput = true;
    this.statusUpdate.emit('Rejected');
    const modalOptions: NgbModalOptions = {
      backdrop: false, // Désactiver le blocage de fond
      keyboard: true // Activer la fermeture avec la touche "Escape"
    };
    const modalRef = this.modalService.open(ReasonDialogComponent, modalOptions);
 
    this.notif.push(this.reason);
    console.log('demamré:', this.notif);
    modalRef.result.then((reason) => {
      console.log('Reason:', reason);
      this.reason = reason;
   
     
      // Stocker le reason dans la variable locale
      this.navbarService.changeReason(reason);
    }).catch((error) => {
      console.log('Modal closed without entering reason.');
    });
  
  }

  reason: string = '';
  closeModal() {
    // Fermer la fenêtre modale
    this.modalRef.close();
  }
  notif: string[] = [];
  saveReason() {
    
      console.log('Raisossn du rejet:', this.reason);
      
    
  

    this.modalRef.close(this.reason);
  }
  onClose() {
    this.dataName = '';
    this.showFirstDialog = false;
    this.showSecondDialog = false;
  }

  onBack() {
    this.showSecondDialog = false;
    this.showExportButton = false; 
    this.showFirstDialog = true; 
  }





  addInput(index: number) {
    this.inputValues.splice(index + 1, 0, ''); // Ajouter un champ d'entrée vide après l'index spécifié
  }

  removeInput(index: number) {
    this.inputValues.splice(index, 1); // Supprimer le champ d'entrée à l'index spécifié
  }
  exportToExcel() {
    // Simuler un clic sur l'élément input caché pour que l'utilisateur puisse choisir un emplacement de fichier
    document.getElementById('fileInput').click();
  }

  onFileChosen(event: any) {
    const selectedFile = event.target.files[0];
    // Ici, vous pouvez générer le fichier Excel et l'enregistrer à l'emplacement choisi par l'utilisateur
  }



  ngOnInit(): void {
    
  }


  
}
