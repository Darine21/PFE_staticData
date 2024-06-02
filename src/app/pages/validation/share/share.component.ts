import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SelectedItemService } from '../communiation.service';
import { DataService } from '../../static/data.service';
import { Entity } from '../../models/Entity';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../static/details/notification.service';

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
  listaaaa:string[]=[]
  notificationMessage: string;
  notifL: string[] = [];
  listN: string[] = [];
  item: any[] = [];
  ngOnInit(): void {
    this.listaaaa = Array.from(new Set(this.dataservice.getlist()));
    console.log(this.listaaaa);
    this.dataservice.selectedLanguagesDict$.subscribe(dict => {
      this.selectedLanguagesDict = dict;
      console.log("Dictionnaire des langues sélectionnées:", this.selectedLanguagesDict);
    });

    this.dataService.currentName.subscribe(name => this.itemName = name);
    console.log("nele", this.itemName);
    this.item = this.dataService.getitem();
    console.log("item", this.item);
    const selectedLanguagesDict = this.dataservice.getAllSelectedLanguages();
    console.log('Dictionnaire des langues sélectionnées dans AnotherComponent:', selectedLanguagesDict);
    this.dataService.list$.subscribe(updatedList => {
      this.list = updatedList;
      console.log("Received list:", this.list);
    });
    this.dataService.list1$.subscribe(listt => {
      this.listaaa = listt;
      console.log("lolol", this.listaaa);
    })
    const keys = Object.keys(selectedLanguagesDict);
    this.entity = keys;
    console.log('Clés du dictionnaire des langues sélectionnées:', keys);
    console.log("name", this.itemName);

    this.filteredEntities = this.entityCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEntities(value))
    );
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
    this.notificationMessage = `Corresponding ${entity}: ${list.join(',')}`;
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
  constructor(private notificationService: NotificationService,private toastr: ToastrService, public dialogRef: MatDialogRef<ShareDialogComponent>, private dataservice: DataService, private dataService: SelectedItemService) { }
  share() {
    console.log("share");
    this.notificationService.show1(`${this.entityList} are shared `);

  }
  closeDialog() {
    this.dialogRef.close();
  }

  submit(term: string) {
    console.log('Submitted term:', term);
  }
 

}


