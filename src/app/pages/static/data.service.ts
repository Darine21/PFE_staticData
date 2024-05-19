import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StaticData } from '../models/staticdata';
import { Entity } from '../models/Entity';


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
  private formDataListSubject = new BehaviorSubject<StaticData[]>([]);
  //formDataList$ = this.formDataListSubject.asObservable();
    selectedItemID: number;
  private formDataListSource = new BehaviorSubject<StaticData[]>([]);
  formDataList$ = this.formDataListSource.asObservable();
  private formDataListSource2 = new BehaviorSubject<Entity[]>([]);
  formDataList2$ = this.formDataListSource2.asObservable();
    modifiedName: string;
    modifiedCategory: string;
    modifiedStatus: string;
    modifiedCreateBy: string;
    modifiedTypes: string;
  list: string[] = [];
  formDataList: string[]=[];
  constructor() { }
  getList(): string[] {
    return this.list;
  }
  getFormDataList(): any[] {
    return this.formDataList;
  }

  // Méthode pour ajouter des données à la liste
  addFormData(formData: any): void {
    this.formDataList.push(formData);
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

  getFormData(): Observable<any> {
    return this.formData$; // Retourner l'observable des données
  }
  addToSubmittedDataList(formData: StaticData) {
    this.submittedDataList.push(formData);
    console.log("lisssttttt", this.submittedDataList);
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
