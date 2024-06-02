import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StaticService } from '../../../static/static.service';
import { Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import { SelectedItemService } from '../../communiation.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ValidService } from '../../validation.service';
import { ValidSD } from '../../../models/ValidSD';
import { ShareDialogComponent } from '../../share/share.component';
import { Entity } from '../../../models/Entity';
import { Language } from '../../../models/Language';
import { Entity1 } from '../../../models/Entity1';

@Component({
  selector: 'app-share-v',
 
  templateUrl: './share-v.component.html',
  styleUrls: ['./share-v.component.scss']
})
export class ShareVComponent {
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
  versions: any[] = [
  ];
  showValidDialog: boolean = false;
  @Output() publishVersion: EventEmitter<any> = new EventEmitter<any>();
  selectedVersion: any;
  formattedVersions: string[] = [];

  constructor(private dialogue: StaticService,
    @Inject(MAT_DIALOG_DATA) public data: { entities: Entity[], entityNames: { id: number, itemName: string }[] }, private dialog: MatDialog, private validService: ValidService, private fb: FormBuilder, private toastr: ToastrService, private router: Router, private selectedItemService: SelectedItemService, private dialogRef: MatDialogRef<any>) {
    this.entities.forEach((entity, index) => {
      this.entityNames.push({ id: index + 1, itemName: entity.name });
    });
  }


  ngOnInit() {


    this.selectedItemService.currentName.subscribe(name => {
      this.selectedItemName = name;
      console.log("nammeee", this.selectedItemName);
    });
  }
  @Output() statusUpdate: EventEmitter<string> = new EventEmitter<string>();
  publish() {
    this.showValidDialog = true;


    const modalOptions: NgbModalOptions = {
      backdrop: false, // Désactiver le blocage de fond
      keyboard: true // Activer la fermeture avec la touche "Escape"
    };
    this.newCurrencyVersionLink = '/details/' + this.itemId;
    const staticDataId = 1; // Assurez-vous de récupérer l'ID correctement

    // Naviguer vers la page /details/id après la génération du PDF
    this.router.navigate(['/details', staticDataId]);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('fr-FR', {
      hour12: false, // Utiliser un format 24 heures
      timeZone: 'UTC' // Spécifier le fuseau horaire UTC
    });

    this.generatedPDFDate = formattedDate;

    this.versions.push({ versionNumber: this.versions.length + 1, url: this.newCurrencyVersionLink, generatedPDFDate: formattedDate });
    console.log("sss", this.versions);
    const newVersion = { versionNumber: this.versions.length, url: this.newCurrencyVersionLink, generatedPDFDate: this.generatedPDFDate };

    // Mettre à jour le service avec la nouvelle version
    this.selectedItemService.updateSelectedVersion(newVersion);
    this.selectedItemService.publishVersion(newVersion);
    console.log("nom", this.selectedItemName);
    console.log("date", currentDate);
    console.log("Creat", this.versions);

    this.formattedVersions = this.versions.map(version => {
      return `versionNumber: ${version.versionNumber}, url: ${version.url}, generatedPDFDate: ${version.generatedPDFDate}`;
    });
    console.log("dqqq", this.formattedVersions);

    const validStaticData: ValidSD = {

      Name: this.selectedItemName,


      Status: "Approval",
      DateCreated: new Date(),
      CreatedBy: 'name',
      values: ['']
    };

    // Appelez l'API pour enregistrer les données
    this.validService.saveValidStaticData(validStaticData).subscribe(
      response => {
        console.log('Validation successful:', response);
        this.toastr.success('Données enregistrées avec succès.');
      },
      error => {
        // Erreur lors de la requête
        this.toastr.error('Une erreur s\'est produite lors de l\'enregistrement des données.');
        console.error(error);
      });

  }
  updateSelectedVersion(version: number): void {
    this.selectedItemService.updateSelectedVersion(version);
  }
  closeDialog(): void {
    this.dialogRef.close();


  }
  entities: Entity1[] = [
    {
      name: 'Entity 1',
      language: [
        new Language('en', 'English'),
        new Language('fr', 'French')
      ]
    },
    {
      name: 'Entity 2',
      language: [
        new Language('es', 'Spanish'),
        new Language('de', 'German')
      ]
    }
  ];
  Vshare: boolean = false;
  goTovalid() {
    this.dataName = '';
    this.showFirstDialog = false;
    this.showSecondDialog = false;
    //this.Vshare = true;
    //this.selectedItemService.changeshare(this.Vshare);
    this.openShareDialog();
  }
  entityNames: { id: number, itemName: string }[] = [];
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

  onClose() {
    this.dataName = '';
    this.showFirstDialog = false;
    this.showSecondDialog = false;
    this.router.navigate(['/valide']);
  }




}
