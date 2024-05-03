import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private formDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  formData$: Observable<any> = this.formDataSubject.asObservable();
  private dataSubmittedSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  dataSubmitted$: Observable<any> = this.dataSubmittedSubject.asObservable();

  constructor() { }

  updateFormData(formData: any) {
    this.formDataSubject.next(formData);
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
 
}
