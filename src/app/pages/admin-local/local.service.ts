import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private dataListSource = new BehaviorSubject<any[]>([]);
  currentDataList = this.dataListSource.asObservable();

  constructor() { }

  changeDataList(dataList: any[]) {
    this.dataListSource.next(dataList);
  }
}
