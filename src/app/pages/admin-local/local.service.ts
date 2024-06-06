import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private dataListSource = new BehaviorSubject<any[]>([]);
  currentDataList = this.dataListSource.asObservable();

  constructor() { }
  private entitySource = new BehaviorSubject<string>('');
  currentEntity = this.entitySource.asObservable();
  changeEntity(entity: string) {
    this.entitySource.next(entity);
  }

  private entitySource1 = new BehaviorSubject<string>('');
  currentEntity1 = this.entitySource1.asObservable();
  changeEntity1(entity: string) {
    this.entitySource.next(entity);
  }
  changeDataList(dataList: any[]) {
    this.dataListSource.next(dataList);
  }
 
}
