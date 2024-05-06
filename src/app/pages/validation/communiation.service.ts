import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedItemService {
  private publishedVersions: any[] = [];
  private selectedItemSubject = new BehaviorSubject<string>('');
  selectedItem$ = this.selectedItemSubject.asObservable();
  selectedItemc$ = new BehaviorSubject<string>('');
  private selectedVersionSubject = new BehaviorSubject<any>(null);
  selectedVersion$ = this.selectedVersionSubject.asObservable();
  updateSelectedItem(name: string): void {
    this.selectedItemSubject.next(name);
  }
  updateSelectedVersion(newVersion: any): void {
    this.selectedVersionSubject.next(newVersion);
  }

  publishVersion(newVersion: any): void {
    this.publishedVersions.push(newVersion);
  }
  updateStatus(newStatus: string) {
    // Mettre à jour le statut de l'élément en émettant la nouvelle valeur
    this.selectedItemc$.next(newStatus);
  }
  getPublishedVersions(): any[] {
    return this.publishedVersions;
  }
}
