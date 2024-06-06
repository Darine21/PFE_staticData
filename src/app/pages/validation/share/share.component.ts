import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SelectedItemService } from '../communiation.service';
import { DataService } from '../../static/data.service';

import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../static/details/notification.service';
import { Router } from '@angular/router';
import { Entity } from '../../models/Entity';
import { EntityLocal } from '../../models/EntityLocal';

interface Entity1 {
  name: string;
}
@Component({
  selector: 'app-share-dialog',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareDialogComponent {
  entityCtrl = new FormControl();
  filteredEntities: Observable<string[]>;
  entity: string[] = [];
  showEntityList = false;
  entities: Entity1[] = [
    { name: 'Entity1' },
    { name: 'Entity2' },
    { name: 'Entity3' },
    { name: 'Entity4' }
  ];

  date: Date = new Date();
    selectedEntity: any[]=[];
    itemName: string;
  lista: string[] = [];
  list: any[] = [];
  listaaa: Entity[];
  
  selectedLanguagesDict: { [key: string]: string[]; };
  selectedShareDict: { [key: string]: EntityLocal[]; };
  listaaaa:string[]=[]
  notificationMessage: string;
  notifL: string[] = [];
  listN: string[] = [];
  item: any[] = [];
    submittedDataList: any;
  ngOnInit(): void {
    console.log(localStorage.dicE);
    // Récupérer la chaîne JSON depuis localStorage
    const jsonString = localStorage.dicE;

    // Parser la chaîne JSON en un objet JavaScript
    const dictionnaire = JSON.parse(jsonString);

    // Parcourir chaque clé du dictionnaire et afficher la clé avec ses valeurs
   
    const nouveauDictionnaire = {};

    // Parcourir chaque clé du dictionnaire et construire un nouvel objet avec la structure souhaitée
    for (const cle in dictionnaire) {
      const nouvelleCle = cle.charAt(0)+cle.slice(1); // Mettre en majuscule la première lettre de la clé
      nouveauDictionnaire[nouvelleCle] = dictionnaire[cle];
    }

    console.log("n",nouveauDictionnaire);


    this.submittedDataList = this.dataService.getSubmittedDataList();
    console.log("listt", this.submittedDataList);

    this.listaaaa = Array.from(new Set(this.dataservice.getlist()));
    console.log(this.listaaaa);
    this.dataservice.selectedLanguagesDict$.subscribe(dict => {
      this.selectedLanguagesDict = dict;
      console.log("Dictionnaire des langues sélectionnées:", this.selectedLanguagesDict);
    });

    this.selectedLanguagesDict = nouveauDictionnaire;
      console.log("Dictionnaire des langues sélectionnées:", this.selectedLanguagesDict);
 

    this.dataService.currentName.subscribe(name => this.itemName = name);
    console.log("nele", this.itemName);
    this.item = this.dataService.getitem();
    console.log("item", this.item);
    const selectedLanguagesDict1 = this.dataservice.getAllSelectedLanguages();
    console.log('Dictionnaire des langues sélectionnées dans AnotherComponent:', selectedLanguagesDict1);
  
    this.list = Object.keys(this.selectedLanguagesDict);
  
    this.dataService.list1$.subscribe(listt => {
      this.listaaa = listt;
      this.listaaa = listt;
      console.log("lolol", this.listaaa);
    })
    const keys = Object.keys(this.selectedLanguagesDict);
    this.entity = keys;
    console.log('Clés du dictionnaire des langues sélectionnées:', keys);
    console.log("name", this.itemName);
    console.log("", this.entityCtrl);
    this.filteredEntities = this.entityCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEntities(value))
    
    );
    console.log("", this.entityCtrl);
  }

  private _filterEntities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.entity.filter(entity => entity.toLowerCase().includes(filterValue));
  }

  toggleEntityList() {
    this.showEntityList = !this.showEntityList;
  }
  value: string[];
  entityDictionary: { [key: string]: string[] } = {};
  
  selectedEntityVisible: boolean = true;
  entityList: string[] = [];
  
selectEntity(entity: string): void {
  console.log('Entity:', entity);
  console.log(this.selectedLanguagesDict[entity]);
  // Récupérer les valeurs du dictionnaire pour l'entité donnée
  const selectedLanguages = this.selectedLanguagesDict[entity];

  // Comparer les valeurs avec celles de this.listaaaa
  const mismatchedLanguages: string[] = [];
  const list: string[] = [];
  
  if (selectedLanguages) {
    selectedLanguages.forEach(lang => {
      if (!this.listaaaa.includes(lang)) {
        mismatchedLanguages.push(lang);
      } else {
        list.push(lang);
      }
    });
  }
  if (mismatchedLanguages.length > 0) {
    // Construire le message de notification
    this.notificationMessage = `The following languages for ${entity} do not match: ${mismatchedLanguages.join(', ')}`;

    this.listN.push(this.notificationMessage);
    this.notificationService.show(`The following languages for ${entity} do not match: ${mismatchedLanguages.join(', ')}`
);

    console.log(this.notificationMessage);
    this.selectedEntityVisible = false;
  } else {
    // Réinitialiser la notification s'il n'y a pas de différence
    this.notificationMessage = ` ${entity}: ${list.join(',')}`;
    this.notifL.push(this.notificationMessage);
    console.log(this.notifL);
    this.entityList.push(entity);
    this.selectedEntityVisible = true;
  }

  // Parcourir les clés du dictionnaire
  for (const key in this.selectedLanguagesDict) {
    if (Object.prototype.hasOwnProperty.call(this.selectedLanguagesDict, key)) {
      if (key === entity) {
        // Accéder à la valeur correspondante à la clé
        this.value = this.selectedLanguagesDict[key];
        console.log('Languages:', this.value);

        // Mettre à jour le dictionnaire des entités
        this.entityDictionary[entity] = this.value;
        console.log('Entity Dictionary:', this.entityDictionary);

        break; // Sortir de la boucle une fois que l'entité est trouvée
      }
    }
  }

  // Masquer la liste des entités
  this.showEntityList = false;
}



  
  searchTerm = '';

  recentlySharedEntities = [{ name: 'Entity1' }, { name: 'Entity2' }];
  constructor(private notificationService: NotificationService,private router:Router,   private toastr: ToastrService, public dialogRef: MatDialogRef<ShareDialogComponent>, private dataservice: DataService, private dataService: SelectedItemService) { }
  share() {
    console.log("share");
    this.notificationService.show(` ${this.itemName} is shared with ${this.entityList} `);
    console.log(this.entityList);
    if (!this.selectedShareDict) {
      this.selectedShareDict = {};
    }
    for (let item of this.entityList) {
      this.selectedShareDict[item] = this.submittedDataList
    }
    console.log("dict", this.selectedShareDict);
    localStorage.setItem('share', JSON.stringify(this.selectedShareDict));
    const dictionstore = localStorage.getItem('share');
    if (dictionstore) {
      this.selectedShareDict = JSON.parse(dictionstore);
    }
    console.log(localStorage.share);
 
  }
  closeDialog() {
    this.dialogRef.close();
    this.router.navigate(['/valide'])
  }

  submit(term: string) {
    console.log('Submitted term:', term);
  }
 

}


