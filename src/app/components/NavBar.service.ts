import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private reasonSource = new BehaviorSubject<string>('');
  currentReason = this.reasonSource.asObservable();
  private NameSource = new BehaviorSubject<string>('');
  currentName = this.NameSource.asObservable();
  reason$ = this.reasonSource.asObservable();

  private _reasonData: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  reasonData$: Observable<string[]> = this._reasonData.asObservable();
  constructor() { }

  changeReason(reason: any) {
    this.reasonSource.next(reason);
  }
  changeName(name: any) {
    this.NameSource.next(name);
  }
  updateReasonData(data: string[]) {
    this._reasonData.next(data);
  }
}
