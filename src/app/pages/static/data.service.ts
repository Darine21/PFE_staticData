import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


import { MatDialogRef } from '@angular/material/dialog';
import { Entity } from '../models/Entity';
import { StaticData } from '../models/staticdata';
import { EntityLocal } from '../models/EntityLocal';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private formDataSubject1: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  formData1$: Observable<any> = this.formDataSubject1.asObservable();
  private formDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  formData$: Observable<any> = this.formDataSubject.asObservable();
  private dataSubmittedSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  dataSubmitted$: Observable<any> = this.dataSubmittedSubject.asObservable();
  formData: any;
  submittedDataList: StaticData[] = [];
  submittedDataList1: EntityLocal[]=[]
  private formDataListSubject = new BehaviorSubject<StaticData[]>([]);
  //formDataList$ = this.formDataListSubject.asObservable();
    selectedItemID: number;
  private formDataListSource = new BehaviorSubject<StaticData[]>([]);
  formDataList$ = this.formDataListSource.asObservable();
  private formDataListSource2 = new BehaviorSubject<Entity[]>([]);
  formDataList2$ = this.formDataListSource2.asObservable();
   private itemNameSource = new BehaviorSubject<string>('');
  currentName = this.itemNameSource.asObservable();
  private itemLangSource = new BehaviorSubject<string[]>([]);
  currentLang = this.itemLangSource.asObservable();
  private selectedLanguagesDict: { [entityName: string]: string[] } = {};
    modifiedName: string;
    modifiedCategory: string;
    modifiedStatus: string;
    modifiedCreateBy: string;
    modifiedTypes: string;
  list: string[] = [];
  formDataList: string[]=[];
    newName: string;
    transferredItem: any;
  constructor() { }
  getList(): string[] {
    return this.list;
  }

  private formDataSubject4 = new BehaviorSubject<StaticData | null>(null);
  formData4$ = this.formDataSubject.asObservable();

  private formDataListSubject4 = new BehaviorSubject<StaticData[]>([]);
  formDataList4$ = this.formDataListSubject.asObservable();

  // Ajoutez les autres membres et méthodes du service ici...

  setFormData1(formData: StaticData) {
    this.formDataSubject4.next(formData);
  }
   private dataNameSource = new BehaviorSubject<string>(null);
  currentDataName = this.dataNameSource.asObservable();
  private dataIDSource = new BehaviorSubject<number>(null);
  currentIDName$ = this.dataIDSource.asObservable();
  private dataSource = new BehaviorSubject<string>(null);
  currentNamee$ = this.dataSource.asObservable();
  changeIDName(name: number) {
    this.dataIDSource.next(name);
  }
  ChangeName(name: string) {
    this.dataSource.next(name)
  }
  private confirmSubject = new Subject<boolean>();

  confirm$ = this.confirmSubject.asObservable();

  confirm(value: boolean) {
    this.confirmSubject.next(value);
  }
  changeDataName(name: string) {
    this.dataNameSource.next(name);
  }
  private dataSource2 = new BehaviorSubject<string>(null);
  currentNamee1$ = this.dataSource2.asObservable();
  getEntity(name: string) {
    this.dataSource2.next(name);
  }
  message:string
  setMessage(name: string) {
    this.message = name;
  }
  getMessage() {
    return this.message;
  }

  private userRoleSubject = new BehaviorSubject<string>(null);
  userRole$ = this.userRoleSubject.asObservable();

  // Méthode pour mettre à jour le rôle de l'utilisateur
  updateUserRole(role: string) {
    this.userRoleSubject.next(role);
  }
  transferredItemSubject: Subject<any> = new Subject<any>();
  transferItem(item: any) {
    this.transferredItemSubject.next(item);
  }
  private itemSource = new BehaviorSubject<StaticData>(null);
  currentItem = this.itemSource.asObservable();
  changeItem(item: StaticData) {
    this.itemSource.next(item);
  }
  private itemSource1 = new BehaviorSubject<StaticData>(null);
  currentItem1 = this.itemSource1.asObservable();
  changeItem1(item: StaticData) {
    this.itemSource1.next(item);
  }
  private formDataDeletedSubject: Subject<boolean> = new Subject<boolean>();
  submitDeletedState(isDeleted: boolean): void {
    // Envoyer l'état de suppression via le sujet observé
    this.formDataDeletedSubject.next(isDeleted);
  }
  getFormDataDeletedSubject(): Subject<boolean> {
    return this.formDataDeletedSubject;
  }
  private staticDataList: StaticData[] = [
    // Liste initiale des données statiques
  ];
  deleteItemById(id: string): void {
    this.staticDataList = this.staticDataList.filter(item => item.Name !== id);
  }
 

  getTransferredItem(): any {
    return this.transferredItem;
  }
  // Getter pour récupérer les données
  getStaticDataList(): StaticData[] {
    return this.staticDataList;
  }


  setSelectedLanguages(entityName: string, languages: string[]): void {
    this.selectedLanguagesDict[entityName] = languages;
  }

  getSelectedLanguages(entityName: string): string[] {
    return this.selectedLanguagesDict[entityName];
  }

  getAllSelectedLanguages(): { [entityName: string]: string[] } {
    return this.selectedLanguagesDict;
  }
  getFormDataList(): any[] {
    return this.formDataList;
  }
  changeName(name: string) {
    this.itemNameSource.next(name);
  }
 
  changeLang(name: string[]) {
    this.itemLangSource.next(name);
  }
  // Méthode pour ajouter des données à la liste
  addFormData(formData: any): void {
    this.formDataList.push(formData);
  }
  private formDataListSource3 = new Subject<any>();
  formDataList3$ = this.formDataListSource3.asObservable();

  dialogRef: MatDialogRef<any>;


  open(dialogRef: MatDialogRef<any>) {
    this.dialogRef = dialogRef;
  }

  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
  sendFormData(data: any) {
    this.formDataListSource3.next(data);
  }
  // Méthode pour définir la liste entière
  setFormDataList(formDataList: any[]): void {
    this.formDataList = formDataList;
  }
  // Méthode pour ajouter un élément à la liste
  addToList(item: string): void {
    this.list.push(item);
  }
  
  updateFormData(formData: any) {
    this.formDataSubject.next(formData);
  }
  updateFormData1(formData1: any) {
    this.formDataSubject1.next(formData1);
  }
  updateFormDataList1(formDataList: Entity[]) {
    this.formDataListSource2.next(formDataList);
  }
  updateFormDataList(formDataList: StaticData[]) {
    this.formDataListSource.next(formDataList);
  }
  private changeDataSubject = new BehaviorSubject<any>(null);
  changeData$ = this.changeDataSubject.asObservable();

  sendChangeData(data: any) {
    this.changeDataSubject.next(data);
  }
  liste:string[]
  setlist(name:string[]) {
    this.liste=name
  }
  getlist() {
    return this.liste;
  }
  private selectedLanguagesDictSubject = new BehaviorSubject<{ [key: string]: string[] }>({});
  selectedLanguagesDict$ = this.selectedLanguagesDictSubject.asObservable();

  updateSelectedLanguagesDict(dict: { [key: string]: string[] }): void {
    this.selectedLanguagesDictSubject.next(dict);
  }
  deleteFormDataById(formDataId: number) {
    const currentValue = this.formDataSubject.value;
    if (currentValue && Array.isArray(currentValue)) {
      const updatedValue = currentValue.filter((data: any) => data.id !== formDataId);
      this.formDataSubject.next(updatedValue);
    } else {
      console.error('La valeur de formDataSubject n\'est pas un tableau ou est null.');
    }
  }
  emitDataSubmitted(data: any) {
    this.dataSubmittedSubject.next(data);
  }
  private inputValuesSource = new BehaviorSubject<string[]>([]);
  inputValues$ = this.inputValuesSource.asObservable();
  setFormData(formData: any) {
    this.formDataSubject.next(formData); // Émettre les données via le sujet observable
  }
  setNewName(name: string) {
    this.newName = name;
  }
  newType :string;
  setNewTypes(name: string) {
    this.newType = name;
  }
  Newid: number;
  setId(name: number) {
    this.Newid = name;
  }
  NewB: boolean;
  setB(name: boolean) {
    this.NewB = name;
  }
  NewC: string;
  setNewCategory(name: string) {
    this.NewC = name;
  }
  newCR: string;
  setNewC(name: string) {
    this.newCR=name
  }
  newS: string;
  newA: string;
  newR: string;
  getNewData() {
    return {
      newName: this.newName,
      newS: this.newS,
      newA: this.newA,
      newR: this.newR
    };
  }
  getNewC() {
    return this.newCR;
  }
  getNewName() {
    return this.newName;
  }
  getNewCatecory() {
    return this.NewC;
  }
  getNewType() {
    return this.newType;
  }
  getFormData(): Observable<any> {
    return this.formData$; // Retourner l'observable des données
  }
  addToSubmittedDataList(formData: StaticData) {
    this.submittedDataList.push(formData);
    console.log("lisssttttt", this.submittedDataList);
  }
  addToSubmittedDataList1(formData: EntityLocal) {
    this.submittedDataList1.push(formData);
    console.log("lisssttttt", this.submittedDataList1);
  }
  setSelectedItemID(id: number): void {
    this.selectedItemID = id;
  }
  setModifiedName(name: string) {
    this.modifiedName = name;
  }

  getModifiedCategory(): string {
    return this.modifiedCategory;
  }
  setModifiedCategory(name: string) {
    this.modifiedCategory = name;
  }

  getModifiedName(): string {
    return this.modifiedName;
  }
  getSelectedItemID(): number {
    return this.selectedItemID;
  }
  getModifiedStatus(): string {
    return this.modifiedStatus;
  }
  setModifiedStatus(name: string) {
    this.modifiedStatus = name;
  }
  getModifiedCreatedBy(): string {
    return this.modifiedCreateBy;
  }
  setModifiedCreatedBy(name: string) {
    this.modifiedCreateBy = name;
  }
  getModifiedTypes(): string {
    return this.modifiedTypes;
  }
  setModifiedTypes(name: string) {
    this.modifiedTypes = name;
  }

}
