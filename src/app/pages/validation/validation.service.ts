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
import { ValidSD } from '../models/ValidSD';
import { RejectSD } from '../models/RejectSD';
import { SharedSD } from '../models/SharedSD';
@Injectable({
  providedIn: 'root'
})
export class ValidService {
  formData: ValidSD = {
   
    Name: '',
    Versions: [],
    PDF: '',
    Status: 'Approval',
    DateCreated: new Date(),
    CreatedBy: '',
    Entity: [],
  };
  FormData: RejectSD = {
    Name: '',
    Status: 'Rejected',
    DateCreated: new Date(),
    CreatedBy: '',
    Reason:''
  }
  list: StaticData[];


  constructor(private http: HttpClient, private router: Router) { }
  saveValidStaticData(validStaticData: ValidSD){
    return this.http.post(`${environment.appUrl}/api/pages/static/ValidStaticData/saveValidStaticData`, validStaticData);
  }
  saveRejectedStaticData(rejectedStaticData: RejectSD) {
    return this.http.post(`${environment.appUrl}/api/pages/static/RejectStaticData/reject`, rejectedStaticData);
  }
  saveSharedStaticData(SharedStaticData: SharedSD) {
    //const serializedData = JSON.stringify(SharedStaticData);
    return this.http.post(`${environment.appUrl}/api/pages/static/SharedSD/saveSharedStaticData`, SharedStaticData );
  }

}
