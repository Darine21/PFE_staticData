import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private reasonSource = new BehaviorSubject<any[]>([]);
  currentReason = this.reasonSource.asObservable();
  private NameSource = new BehaviorSubject<string>('');
  currentName = this.NameSource.asObservable();
  reason$ = this.reasonSource.asObservable();
  private StatusSource = new BehaviorSubject<string>('');
  currentstatus= this.StatusSource.asObservable();
  private _reasonData: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  reasonData$: Observable<string[]> = this._reasonData.asObservable();
  private reasonsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public reasons$: Observable<string[]> = this.reasonsSubject.asObservable();

  constructor() { }

  changeReason(reason: any) {
    this.reasonSource.next(reason);
  }
  changeName(name: any) {
    this.NameSource.next(name);
  }
  changeStatus(status: any) {
    this.StatusSource.next(status);
  }
 
  updateReasons(reasons: any[]) {
    // Émettre les raisons mises à jour à travers le BehaviorSubject
    this.reasonSource.next(reasons);
  }
  getReasons(): Observable<string[]> {
    return this.reasons$;
  }
  updateReasonData(data: string[]) {
    this._reasonData.next(data);
  }
}
