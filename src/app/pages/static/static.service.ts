import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register';
import { environment } from '../../../environments/environement.developement';
import { Login } from '../models/login';
import { User } from '../models/user';
import { Observable, ReplaySubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StaticData } from '../models/staticdata';

@Injectable({
  providedIn: 'root'
})
export class StaticService {
  formData: StaticData = {
     
      Name: '',
      Types: '',
    Category: '',
    Status: 'Inactive/Draft',
    DateCreated: new Date().toLocaleDateString('fr-FR', {
      hour12: false,
      timeZone: 'UTC'
    }),
    CreatedBy: '',
    inputValues:[],
  };
  list: StaticData[];


  constructor(private http: HttpClient, private router: Router) { } 
  Addition(model: StaticData) {
  return this.http.post(`${environment.appUrl}/api/pages/static/StaticData/Addition`, model);
  }
  DeleteStaticData(model: StaticData) {
    return this.http.delete(`${environment.appUrl}/api/pages/static/StaticData/${model.Name}`);
  }
  GetStaticData(model: StaticData) {
    return this.http.get(`${environment.appUrl}/api/pages/static/details/${model.Name}`)
  }
  refreshList() {
    this.http.get(`${environment.appUrl}/api/pages/static/data`)
      .toPromise()
      .then(res => this.list = res as StaticData[]);
  }
  ValidateStaticData(model: string) {
    return this.http.put(`${environment.appUrl}/api/pages/static/StaticData/validate`, model)
  }
  RejectedStaticData(model: string) {
    return this.http.put(`${environment.appUrl}/api/pages/static/StaticData`, model)
  }
  DeleteSubmit(model: string) {
    return this.http.delete(`${environment.appUrl}/api/pages/static/StaticData/stat`)
  } 

}

