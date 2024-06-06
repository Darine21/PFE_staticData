import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Entity } from '../models/Entity';

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

  private selectedShareSubject = new BehaviorSubject<any>(null);
  selectedShare$ = this.selectedShareSubject.asObservable();


  private itemNameSource = new BehaviorSubject<string>('');
  currentName = this.itemNameSource.asObservable();
    submittedDataList: any[];
  updateSelectedItem(name: string): void {
    this.selectedItemSubject.next(name);
  }
  updateSelectedVersion(newVersion: any): void {
    this.selectedVersionSubject.next(newVersion);
  }
  private itemvalideSource = new BehaviorSubject<boolean>(null);
  currentvalide = this.itemvalideSource.asObservable();

  changeshare(name: boolean) {
    this.itemvalideSource.next(name);
    console.log("sharee", name);
  }
  private listSubject = new BehaviorSubject<any[]>([]);
  list$ = this.listSubject.asObservable();
  item: any[] = [];
  shareitem(itemm: any) {
    this.item = itemm
  }
  setSubmittedDataList(dataList: any[]) {
    this.submittedDataList = dataList;
  }

  getSubmittedDataList() {
    return this.submittedDataList;
  }
  getitem() {
    return this.item
  }
  updateList(newList: any[]) {
    this.listSubject.next(newList);
  }
  private listSubject1 = new BehaviorSubject<Entity[]>([]);
  list1$ = this.listSubject1.asObservable();

  updateList1(newList: Entity[]) {
    this.listSubject1.next(newList);
  }
  changeName(name: string) {
    this.itemNameSource.next(name);
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
  private sharedData: any;

  setSharedData(data: any) {
    this.sharedData = data;
  }

  getSharedData() {
    return this.sharedData;
  }
  newname: string;
  setsharedata(name: string) {
    this.newname=name
  }
  getsharedata() {
    return this.newname;
  }
  setItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(localStorage);
  }

  // Récupérer des données depuis le stockage local
  getItem(key: string): any {
    const storedData = localStorage.getItem(key);
    console.log(storedData);
    return storedData ? JSON.parse(storedData) : null;
  }

}
