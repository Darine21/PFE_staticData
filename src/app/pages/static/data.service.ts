import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private formDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  formData$: Observable<any> = this.formDataSubject.asObservable();

  constructor() { }

  updateFormData(formData: any) {
    this.formDataSubject.next(formData);
    console.log("Données reçues dans le service :", formData);
  }
  
}
