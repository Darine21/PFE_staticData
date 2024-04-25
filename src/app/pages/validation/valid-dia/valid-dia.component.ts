import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StaticService } from '../../static/static.service';
import { Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import { SelectedItemService } from '../communiation.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-valid-dia',
  templateUrl: './valid-dia.component.html',
  styleUrls: ['./valid-dia.component.scss']
})
export class ValidDiaComponent implements OnInit {

  showFirstDialog: boolean = true;
  showSecondDialog: boolean = false;
  dataName: string = '';
  inputValues: string[] = [''];
  showCreateButton: boolean = true; // Contrôle la visibilité du bouton Create
  showExportButton: boolean = true; // Contrôle la visibilité du bouton Export
  bulkValues: string = ''; 
  addedBulkValues: string[] = [];
  dataType: string;
  dataCategory: string;
  inputMethod: string;
  
  @Output() addItem = new EventEmitter<any>();
  @Output() dataSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() formSubmitted = new EventEmitter<any>();
 selectedItemName: string = '';
  myForm: FormGroup;
  errorMessages: any;
  newCurrencyVersionLink: string = '';
  itemId: any;
  showConfirmationMessage: boolean = false;
  generatedPDFDate: string = '';
  index: number = 2;
  versions:any[]=[];

  constructor(private dialogue: StaticService, private fb: FormBuilder, private toastr: ToastrService, private router: Router, private selectedItemService: SelectedItemService, private dialogRef: MatDialogRef<any> ) { }
  ngOnInit() {
    this.versions = this.versions = [
      
      
    ];
    
    this.selectedItemService.selectedItem$.subscribe(name => {
      this.selectedItemName = name;
    });
  }
   
  publish(closeDialog: boolean = true) {
    // Effectuez les actions nécessaires pour publier la donnée
    // Supposons que newCurrencyVersionLink soit l'URL de la nouvelle version
    this.newCurrencyVersionLink = '/details/' + this.itemId;
    const staticDataId = 1; // Assurez-vous de récupérer l'ID correctement

    // Naviguer vers la page /details/id après la génération du PDF
    this.router.navigate(['/details', staticDataId]);
    const currentDate = new Date();

    const hours = currentDate.getHours().toString().padStart(2, '0'); // Récupérer les heures et les formater avec deux chiffres
    const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Récupérer les minutes et les formater avec deux chiffres
    const secondes = currentDate.getSeconds().toString().padStart(2, '0');
    this.generatedPDFDate = hours + ':' + minutes + ':' + secondes; // Concaténer les heures et les minutes avec un deux-points
    this.versions.push({ versionNumber: this.versions.length + 1, url: this.newCurrencyVersionLink });

    // Si closeDialog est true, fermez le dialogue
    if (closeDialog) {
      this.onClose();
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  generatePDF() {
    this.showConfirmationMessage = true;
    const element = document.getElementById('detailsContent');
    const options = {
      margin: 0,
      filename: 'details.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
  }
  onClose() {
    this.dataName = '';
    this.showFirstDialog = false;
    this.showSecondDialog = false;
    this.router.navigate(['/valide']);
  }




}

