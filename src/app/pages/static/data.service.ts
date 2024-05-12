import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StaticData } from '../models/staticdata';

@Injectable({
  providedIn: 'root'
})
export class DataService {
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
  constructor() { }

  updateFormData(formData: any) {
    this.formDataSubject.next(formData);
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

  getSelectedItemID(): number {
    return this.selectedItemID;
  }
}
