import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ReasonDialogComponent } from '../../validation/reject-dia/reason-dialog/reason-dialog.component';
import { RejectSD } from '../../models/RejectSD';
import { ValidService } from '../../validation/validation.service';
import { SelectedItemService } from '../../validation/communiation.service';
import { NavbarService } from '../../../components/NavBar.service';
import { DataService } from '../../static/data.service';
import { StaticService } from '../../static/static.service';
import { NotificationService } from '../../static/details/notification.service';
import { ReasonComponent } from './reason/reason.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent {
  showFirstDialog: boolean = true;
  showSecondDialog: boolean = false;
  dataName: string = '';
  inputValues: string[] = [''];
  showRejectDialog: boolean = false;
  showCreateButton: boolean = true; // Contrôle la visibilité du bouton Create
  showExportButton: boolean = true; // Contrôle la visibilité du bouton Export
  modalRef: any;
  submittedDataList: any[] = [];
  toastr: any;
  constructor(private notificationService: NotificationService, private modalService: NgbModal, private validservice: ValidService, private selectedItemService: SelectedItemService, private navbarService: NavbarService, private dataService: DataService, private staticservice: StaticService) { } onNext() {
    //this.showFirstDialog = false;
    this.showSecondDialog = true;
  }
  @Output() statusUpdate: EventEmitter<string> = new EventEmitter<string>();
  showReasonInput: boolean = false;
  rejectReason: string = '';
  openSecondDialog() {
    // Autres logiques nécessaires
    this.statusUpdate.emit('Rejected');
  }
  status1: any;
  onYesClick(): void {
    this.showReasonInput = true;
    const modalOptions: NgbModalOptions = {
      backdrop: false, // Désactiver le blocage de fond
      keyboard: true // Activer la fermeture avec la touche "Escape"
    };
    const modalRef = this.modalService.open(ReasonComponent, modalOptions);

  
    console.log('demamré:', this.notif);
    modalRef.result.then((reason) => {
     
      this.reason = reason;
      console.log('Reason:', reason);
    })
    this.showFirstDialog = false;
    this.notificationService.show('request sent');

    this.modalRef.close();
    this.dataName = '';
    this.showFirstDialog = false;
    this.showSecondDialog = false;
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

  namee: string;
  selectedItemName: string = '';
  ngOnInit(): void {
    this.selectedItemService.selectedItem$.subscribe(name => {
      this.selectedItemName = name;
      console.log("staticdata", this.selectedItemName);// Mettre à jour le selectedItemName lorsque des mises à jour sont émises
    });
    this.namee = this.selectedItemService.getsharedata();
    console.log(this.namee);
    this.submittedDataList = this.dataService.submittedDataList;
    console.log("listtt", this.submittedDataList);
  }
}
