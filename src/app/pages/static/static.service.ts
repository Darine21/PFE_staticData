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
      Id: 1,
      Name: '',
      Types: '',
      Category: '',
      Status: 'Inactive',
    DateCreated: new  Date(),
    CreatedBy: '',
    InputValues:[],
  };
  list: StaticData[];


  constructor(private http: HttpClient, private router: Router) { }
  Addition(model: StaticData) {
    return this.http.post<StaticData>(`${environment.appUrl}/api/pages/static/Addition`, model);
  }
  DeleteStaticData(id: number) {
    return this.http.delete(`${environment.appUrl}/api/pages/static/${id}`);
  }
  GetStaticData(id: number) {
    return this.http.get(`${environment.appUrl}/api/pages/static/details/${id}`)
  }
  refreshList() {
    this.http.get(`${environment.appUrl}/api/pages/static/data`)
      .toPromise()
      .then(res => this.list = res as StaticData[]);
  }
}

