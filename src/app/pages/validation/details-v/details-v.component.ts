import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogsComponent } from '../../static/dialogue/dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { CollapseModule } from 'ng-uikit-pro-standard';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../static/data.service';
import { SelectedItemService } from '../../validation/communiation.service';
import { StaticData } from '../../models/staticdata';
import { TranslationService } from '../../static/details/Translate.service';
import { ToastrService } from 'ngx-toastr';
import { StaticService } from '../../static/static.service';
import { NavbarService } from '../../../components/NavBar.service';
import { ValidDiaComponent } from '../valid-dia/valid-dia.component';
import { RejectDiaComponent } from '../reject-dia/reject-dia.component';
interface Version {
  id: number;
  // Autres propriétés de votre modèle de données...
  selectedItems: any[]; // Déclaration de la propriété selectedItems
}

@Component({
  selector: 'app-details-v',
  templateUrl: './details-v.component.html',
  styleUrls: ['./details-v.component.scss']
})
export class DetailsVComponent implements OnInit {
  data: any[] = [];
  filteredData: any[];
  isNavbarCollapsed = true;
  selectedNavItem: string | null = null;
  activeLineIndex: number = 0;
  selectedDate: string = '';
  creationDate: NgbDateStruct;
  showForm: boolean = true; // Pour afficher soit le formulaire, soit la table
  inputValues: string[] = []; // Tableau pour stocker les valeurs saisies
  isValuesSelected: boolean = false;
  showOptions: boolean[] = [];
  entitiesToShareWith: string[] = ['Entity 1', 'Entity 2', 'Entity 3'];
  //@ViewChild(ShareDiaComponent) multiselectComponent: ShareDiaComponent;
  // Définissez la liste des valeurs prédéfinies
  predefinedValues: string[] = ['Val1', 'Val2', 'Val3'];
  selectedValue: string = '';
  newValue: string = '';
  options: any;
  list: any[] = [];
  checked: boolean;
  selectedItemID: number;
  oldName: string;
  oldC: string;
  oldT: string;
  oldS: string;
  formvaluess: string[] = ['hello', 'welcome'];
  translatedValues: { [key: string]: string[] } = {};
  selectedLanguage: string[] = [];
  listTrans: string[] = [];
    StatusList: any[]=[];

  constructor(private navbarservice: NavbarService, private cd: ChangeDetectorRef, private route: ActivatedRoute, private translationService: TranslationService, private dialog: MatDialog, private router: Router, private dataService: DataService, private selectedItemService: SelectedItemService, private staticservice: StaticService, private toastr: ToastrService) { }
  checkAndAddValue() {
    // Vérifiez si la valeur saisie correspond à l'une des valeurs prédéfinies
    if (this.predefinedValues.includes(this.newValue)) {
      // Ajoutez la valeur saisie à la liste inputValues
      this.inputValues.push(this.newValue);
      // Réinitialisez la valeur saisie à une chaîne vide
      this.newValue = '';
    }
  }
  // Déclarez la variable newValue dans la classe de composant
  toggleLanguage(lang: string) {
    const index = this.selectedLanguages.indexOf(lang);
    if (index >= 0) {
      this.selectedLanguages.splice(index, 1);
    } else {
      this.selectedLanguages.push(lang);
      console.log("entityyy", this.selectedLanguages);
      for (let la of this.selectedLanguages) {
        const list = this.languageNames[la];
        this.listtt.push(list);

        console.log(this.listtt);
      }
    }
  }
  languageNames: { [key: string]: string } = {
    'fr': 'French',
    'es': 'Spanish',
    'ar': 'Arabic',
    'zh': 'Chinese',
    'nl': 'Dutch',
    'fi': 'Finnish',
    'de': 'German',
    'hi': 'Hindi',
    'hu': 'Hungarian',
    'id': 'Indonesian',
    'ga': 'Irish',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'sv': 'Swedish',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'vi': 'Vietnamese',
    'da': 'Danish',
    'el': 'Greek',
    'ms': 'Malay',
    'sq': 'Albanian'
  };
  listtt: string[] = [];

  selectedSection: string = 'details'; // Par défaut, afficher la section 'details'

  selectDetails() {
    this.selectedSection = 'details';
    this.activeLineIndex = 0;
  }

  selectValues() {
    this.selectedSection = 'values';
    this.activeLineIndex = 1;
  }
  showHis = false;
  selectHistory() {
    this.selectedSection = 'history';
    this.showHis = true;
    this.activeLineIndex = 2;
  }
  // Définissez la méthode addNewValue pour ajouter une nouvelle valeur
  addNewValue(value: string) {
    if (value.trim() !== '') {
      this.options.push(value);
      // Réinitialisez la valeur du champ de saisie
      this.newValue = '';
    }
  }
  naviguerVersValide() {
    this.router.navigate(['/valide']);
  }
  sharedEntities: string[] = [];
  addSelectedValue() {
    // Vérifiez si une valeur est sélectionnée
    if (this.selectedValue) {
      // Ajoutez la valeur sélectionnée à la liste inputValues
      this.inputValues.push(this.selectedValue);
      // Réinitialisez la valeur sélectionnée à une chaîne vide
      this.selectedValue = '';
    }
  }

  formDataName: string;
  formDataCategory: string;
  formDataTypes: string;
  formDataStatus: string;
  formDataId: number;
  formDataCreateDate: string;
  formDataCreatedBy: string;
  showDeleteButton: Boolean = false;
  showShareOptions: boolean = false;
  formvalues: string[] = [];
  selectedItemName: string = '';
  selectedVersion: number;
  submittedDataList: any[] = [];
  values: string;
  items: any[] = [
    {
      id: 1,
      name: "new version",
      status: "Inactive",
      category: "Category 1",
      types: ["global"],
      createDate: "2022-04-20",
      createdBy: "User 1",
      checked: false
    }
  ];
  dataName: string = '';
  //isItemSelected: boolean = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  entities = [
    { id: 1, name: 'Entity 1', selected: false },
    { id: 2, name: 'Entity 2', selected: false },
    { id: 3, name: 'Entity 3', selected: false },
    // Ajoutez d'autres entités si nécessaire
  ];
  publishedVersions: Version[] = [];
  showStatusField: boolean = false;



  getselectedEntities(): string[] {
    return this.entities.filter(entity => entity.selected).map(entity => entity.name);
  }
  showShareField: boolean = true;
  isEditing: boolean = false; // 
  valider(item: any): void {
    // Activer le mode édition
    this.isEditing = true;

    // Afficher le champ Share
    this.showShareField = false;
    this.showStatusField = true;
    // Remplir le champ Share avec les entités sélectionnées
    this.selectedEntities = this.selectedItems.map(item => item.itemName);
  }
  valider1() {
    this.selectedItemService.changeName(this.submittedDataList[this.selectedItemID - 1].Name);  
    console.log("nameee", this.submittedDataList[this.selectedItemID - 1].Name);
    console.log("ittem", this.submittedDataList[this.selectedItemID - 1]);
    this.dataService.changeItem(this.submittedDataList[this.selectedItemID - 1]);
    this.submittedDataList[this.selectedItemID - 1].showValidDialog = true;
    console.log("ddd", this.submittedDataList[this.selectedItemID - 1].Name);
    this.staticservice.ValidateStaticData(this.submittedDataList[this.selectedItemID - 1].Name).subscribe(
      (response) => {
        console.log('Validation successful:', response);
        this.submittedDataList[this.selectedItemID - 1].showValidDialog = false;
        this.submittedDataList[this.selectedItemID - 1].Status = 'Approval';
        console.log("azaz", this.submittedDataList[this.selectedItemID - 1].Status);
      },
      (error) => {
        console.error('Validation failed:', error);
      }
    );
    console.log("azaz", this.submittedDataList[this.selectedItemID - 1].Status);
    this.StatusList.push("Approval");
    console.log("status", this.StatusList);
    this.navbarservice.changeStatus(this.StatusList);

    const dialogRef = this.dialog.open(ValidDiaComponent);


    // Gérer la réponse du dialogue
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'publish') {

        console.log('Published');
      } else {
        // Si l'utilisateur a cliqué sur "Cancel" ou a fermé le dialogue
        console.log('Cancelled');
      }
    });
    this.updateSubmittedDataList();

  }
  showRejectDialog: boolean = false;
  reasonsList: { itemId: string, reason: any, status: string }[] = [];
  notif: any[] = [];
  rejeter() {
  
    this.submittedDataList[this.selectedItemID - 1].showRejectDialog = true;
    this.StatusList.push("Rejected");
    console.log("status", this.StatusList);
    this.navbarservice.changeStatus(this.StatusList);
    this.reasonsList.push({ itemId: this.submittedDataList[this.selectedItemID - 1].Name, reason: this.notif, status: "Rejected" });

    console.log("lisstaaa", this.reasonsList);
    this.updateSubmittedDataList();
  
      this.showRejectDialog = true;
      const dialogRef = this.dialog.open(RejectDiaComponent, {
        width: '500px',
      });


      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.showRejectDialog = false;

      });
    

  }
  selectedEntities: string[];

  updateSubmittedDataList() {
    // Mettre à jour submittedDataList dans le service DataService
    this.dataService.submittedDataList = this.submittedDataList;
    // Sauvegarder submittedDataList dans localStorage
    localStorage.setItem('submittedDataList', JSON.stringify(this.submittedDataList));
  }
  // Mettez à jour selectedEntities chaque fois que selectedItems change
  updateSelectedEntities(): void {
    this.selectedEntities = this.selectedItems.map(item => item.itemName);
  }


  loadPublishedVersions(): void {
    // Simulons trois versions publiées avec des identifiants uniques
    for (let i = 1; i <= 3; i++) {
      this.publishedVersions.push({
        id: i,

        selectedItems: [] // Initialisation des entités sélectionnées à vide
      });
    }
  }

  translatedText: string = '';
  textToTranslate: string = 'Hello, how are you?';

  formvaluesList: any[] = [];
  itemId: number;
  formDataList2: any[];
  translations: { [key: number]: { [key: string]: string } } = {};
  selectedLanguages: string[] = [];

  translateAllTexts(language: string) {
    this.formvalues.forEach((value, index) => {
      this.translateText(value, 'en', language, index);
    });
  }

  translateText(name: string, source: string, target: string, index: number) {
    this.translationService.translate(name, source, target).subscribe(
      (response: any) => {
        if (response && response.trans) {
          if (!this.translations[index]) {
            this.translations[index] = {};
          }
          this.translations[index][target] = response.trans;

          if (!this.selectedLanguages.includes(target)) {
            this.selectedLanguages.push(target);
          }

          console.log("Traductions:", this.translations);
          this.cd.detectChanges();
        } else {
          console.error('Réponse de traduction incorrecte:', response);
        }
      },
      (error) => {
        console.error('Erreur de traduction:', error);
      }
    );
  }



  trackByIndex(index: number, item: any): any {
    return index;
  }

  ngOnInit(): void {


    this.dataService.inputValues$.subscribe(values => {
      this.dialogInputValues = values;
    });

    this.selectedItemService.selectedItem$.subscribe(name => {
      this.selectedItemName = name;
      console.log("name", this.selectedItemName);// Mettre à jour le selectedItemName lorsque des mises à jour sont émises
    });
    this.loadPublishedVersions();
    this.selectedItemService.selectedVersion$.subscribe((newVersion: any) => {
      this.selectedVersion = newVersion;
    });
    this.publishedVersions = this.selectedItemService.getPublishedVersions();
    this.inputValues.push(''); // Ajoute une valeur initiale vide
    this.showOptions.push(false);
    this.selectedItemID = this.dataService.getSelectedItemID();
    console.log('selectedItemID:', this.selectedItemID);
    this.submittedDataList = this.dataService.submittedDataList;
    console.log("Liste initiale:", this.submittedDataList);
    
    if (this.submittedDataList) {
        const storedData = localStorage.getItem('SubmitteformDataList');
        console.log(storedData);

      console.log('Données reçues dans StaticComponent :', this.submittedDataList);
      console.log(this.submittedDataList[this.selectedItemID - 1]);
      this.formDataName = this.submittedDataList[this.selectedItemID - 1].Name;
      this.selectedItemService.setsharedata(this.formDataName);
      this.oldName = this.submittedDataList[this.selectedItemID - 1].Name;
        console.log("bellah", this.formDataName);
      this.formDataCategory = this.submittedDataList[this.selectedItemID - 1].Category;
      this.oldC = this.submittedDataList[this.selectedItemID - 1].Category;
      this.formDataTypes = this.submittedDataList[this.selectedItemID - 1].Types;
      this.oldT = this.submittedDataList[this.selectedItemID - 1].Types;
        this.formDataStatus = 'Inactive/Draft';
        this.oldS = 'Inactive/Draft';
        this.formDataId = 1;
        this.formDataCreateDate = new Date().toLocaleDateString('fr-FR', {
          hour12: false,
          timeZone: 'UTC'
        });

        this.formDataCreatedBy = 'name';

        this.showDeleteButton = true;

      this.formvalues = this.submittedDataList[this.selectedItemID - 1].null;

        console.log("valuessss", this.formvalues);

        this.values = this.formvalues[this.selectedItemID - 1];
        console.log("values", this.values);
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('formDataList', JSON.stringify(this.submittedDataList));
        });
        this.checked = false;
        console.log("showDeleteButton:", this.showDeleteButton);
      } else {
        console.log('Aucune donnée dans formData ou formData est null.');
      }
      // Initialise showOptions pour la première valeur
  


    this.dropdownList = [
      { "id": 1, "itemName": "Entity 1" },
      { "id": 2, "itemName": "Entity 2" },
      { "id": 3, "itemName": "Entity 3" },
      { "id": 4, "itemName": "Entity 4" },
      { "id": 5, "itemName": "Entity 5" },
      { "id": 6, "itemName": "Entity 6" },
      { "id": 7, "itemName": "Entity 7" },
      { "id": 8, "itemName": "Entity 8" },
      { "id": 9, "itemName": "Entity 9" },
      { "id": 10, "itemName": "Entity 10" }
    ];
    this.selectedItems = [

    ];
    console.log("ssss");
    this.dropdownSettings = {

      text: "Select Entities",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
  }

  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }



  onItemSelect(item: any, version: Version) {
    if (!this.showShareField) {
      console.log(item);
      console.log(this.selectedItems);
      this.updateSelectedEntities();
      version.selectedItems.push(item);
      // Mettre à jour selectedEntities
    }
  }

  OnItemDeSelect(item: any, version: Version) {
    if (!this.showShareField) {
      console.log(item);
      console.log(this.selectedItems);
      this.updateSelectedEntities();
      version.selectedItems = version.selectedItems.filter(selectedItem => selectedItem !== item);
      // Mettre à jour selectedEntities
    }
  }


  dialogInputValues: string[] = [];

  receiveValuesFromDialog(values: string[]) {
    this.dialogInputValues = values;
  }

  updateSelectedVersion(version: string): void {
    this.selectedItemService.updateSelectedVersion(version);
  }

  updateSelectedItemName(name: string): void {
    this.selectedItemService.updateSelectedItem(name);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Supprimer les espaces vides
    filterValue = filterValue.toLowerCase(); // Mettre en minuscule
    // Appliquer le filtre
    this.filteredData = this.data.filter(item => {
      // Filtrer en fonction du nom ou d'autres propriétés
      return item.name.toLowerCase().includes(filterValue);
    });
  }
  updateStatus(newStatus: string) {
    // Parcourir le tableau items
    this.items.forEach(item => {
      // Vérifier si l'élément correspond à celui rejeté
      if (item.status === "Inactive/Draft") {
        // Mettre à jour le statut de l'élément rejeté
        item.status = newStatus;
      }
    });
  }
  entityyyy: string[] = [];
  getLanguageName(code: string): string {

    this.entityyyy.push(this.languageNames[code]);
    console.log("langggg", this.entityyyy);
    return this.languageNames[code];
  }
  removeLanguage(lang: string) {
    const index = this.selectedLanguages.indexOf(lang);
    if (index >= 0) {
      this.selectedLanguages.splice(index, 1);
    }
  }
  shareOptions() {
    this.showShareOptions = !this.showShareOptions; // Bascule la valeur de showShareOptions
  }

  // Dans votre composant TypeScript
  toggleOptions(index: number): void {
    this.showOptions[index] = !this.showOptions[index];
  }

  // Tableau pour stocker les valeurs saisies

  // Méthode pour ajouter une nouvelle valeur

  addInput() {
    this.formvalues.splice(this.formvalues.length + 1, 0, '');
    this.showOptions.splice(this.formvalues.length, 0, false); // Ajouter un champ d'entrée vide après l'index spécifié
  }

  // Méthode pour supprimer une valeur à l'index spécifié
  removeInput(index: number) {
    this.formvalues.splice(index, 1); // Supprimer le champ d'entrée à l'index spécifié
  }

  // Méthode pour partager la valeur à l'index spécifié



  isItemSelected(item: string): boolean {
    // Retourne true si l'élément spécifié est sélectionné, sinon false
    return item === 'Values' && this.isValuesSelected;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  toggleLine(itemId: string) {
    // Masquez toutes les lignes d'abord
    document.querySelectorAll('.line').forEach((line: HTMLElement) => {
      line.style.display = 'none';
    });
  }



  submitt: boolean = false;
  submit(): void {
    console.log('Submitting data...');
    console.log("this", this.selectedItemID);
    this.dataService.changeIDName(this.selectedItemID);
    const formDataToSend: StaticData = {
      Name: this.formDataName,
      Status: "Inactive/Draft",
      Category: this.formDataCategory,
      Types: this.formDataTypes,
      DateCreated: this.formDataCreateDate,
      CreatedBy: this.formDataCreatedBy,
      inputValues: this.formvalues,
    };
    this.submitt = true;
    this.dataService.submitDeletedState(this.submitt);
    console.log(formDataToSend.Name);
    this.dataService.changeDataName(formDataToSend.Name);

    this.dataService.addToSubmittedDataList(formDataToSend);
    this.router.navigate(['/static']);

  }



  goToStatic() {
    this.router.navigate(['/static'])
  }

  moveLine(index: number) {
    this.activeLineIndex = index;
  }
  isEditingName = false;
  editedName: string;
  startEditingName() {
    this.isEditingName = true;
    // Vous n'avez pas besoin de copier la valeur actuelle dans editedName car les modifications sont directement liées à formDataName
    this.dataService.setModifiedName(this.formDataName); // Sauvegardez directement ici
  }

  isEditingDescription = false;
  saveEditedName() {
    this.formDataList2[this.selectedItemID - 1].Name = this.editedName;
    this.formDataName = this.editedName; // Mettre à jour formDataName
    this.isEditingName = false;
    console.log("save1", this.formDataName);
    this.dataService.setModifiedName(this.editedName);
  }
  isEditingStatus = false;
  editedStatus: string;
  startEditingStatus() {
    this.isEditingStatus = true;
    this.editedStatus = this.formDataList2[this.selectedItemID - 1].Status;
    console.log("save", this.editedStatus);
    this.dataService.setModifiedStatus(this.editedStatus);
  }
  saveEditedStatus() {
    this.formDataList2[this.selectedItemID - 1].Status = this.editedStatus;
    this.formDataStatus = this.formDataList2[this.selectedItemID - 1].Status,
      this.isEditingStatus = false;
    console.log("save1", this.formDataList2[this.selectedItemID - 1].Status);
  }
  isEditingCategory = false;
  editedCategory: string;
  startEditingCategory() {
    this.isEditingCategory = true;
    this.editedCategory = this.formDataList2[this.selectedItemID - 1].Category;
    console.log("save", this.editedCategory);
    this.dataService.setModifiedCategory(this.editedCategory);
  }


  saveEditedCategory() {
    this.formDataList2[this.selectedItemID - 1].Category = this.editedCategory;
    this.formDataCategory = this.formDataList2[this.selectedItemID - 1].Category,
      this.isEditingCategory = false;
    console.log("save1", this.formDataList2[this.selectedItemID - 1].Category);
  }

  isEditingTypes = false;
  editedTypes: string;
  startEditingTypes() {
    this.isEditingTypes = true;
    this.editedTypes = this.formDataList2[this.selectedItemID - 1].Types;
    console.log("save", this.editedTypes);

  }


  saveEditedTypes() {
    this.formDataList2[this.selectedItemID - 1].Types = this.editedTypes;
    this.formDataTypes = this.formDataList2[this.selectedItemID - 1].Types,
      this.isEditingTypes = false;
    console.log("save1", this.formDataList2[this.selectedItemID - 1].Types);
    this.dataService.setModifiedTypes(this.editedTypes);

  }
  isEditingCreateby = false;
  editedCreatedBy: string;
  startEditingCreateBy() {
    this.isEditingCreateby = true;
    this.editedCreatedBy = this.formDataList2[this.selectedItemID - 1].CreatedBy;
    console.log("save", this.editedTypes);
    this.dataService.setModifiedCreatedBy(this.editedCreatedBy);
  }


  saveEditedCreateBy() {
    this.formDataList2[this.selectedItemID - 1].CreatedBy = this.editedCreatedBy;
    this.formDataCreatedBy = this.formDataList2[this.selectedItemID - 1].CreatedBy,
      this.isEditingCreateby = false;
    console.log("save1", this.formDataList2[this.selectedItemID - 1].CreatedBy);
  }

  newName: string;
  newS: string;
  newR: string;
  newA: string;
  newD: string;
  newN: number;
  goTovalidation() {
    this.router.navigate(['/valide'])
  }
  saveChanges() {
    this.router.navigate(['/valide'])
    this.newName = this.formDataName;
    console.log("apres", this.newName);
    this.dataService.setNewName(this.newName);

    this.newS = this.formDataStatus;
    console.log("apres", this.newS);


    this.newA = this.formDataCategory;
    console.log("apres", this.newA);

    this.newR = this.formDataTypes;
    console.log("apres", this.newR);


    this.router.navigate(['/static']);

    console.log("old", this.oldName);



  }

}

