import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedItemService {
  private selectedItemSubject = new BehaviorSubject<string>('');

  selectedItem$ = this.selectedItemSubject.asObservable();

  updateSelectedItem(name: string): void {
    this.selectedItemSubject.next(name);
  }
}
