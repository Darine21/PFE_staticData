import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-share-dia',
  templateUrl: './share-dia.component.html',
  styleUrls: ['./share-dia.component.scss'],
  
})

export class ShareDiaComponent implements OnInit {

  myForm: FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  cities: Array<any> = [];
  selectedItems: Array<any> = [];

  dropdownSettings: any = {};
  
 

  options: string[] = ['Option 1', 'Option 2', 'Option 3']; // Liste des options disponibles
  selectedOptions: string[] = []; // Options sélectionnées

  constructor() { }
  ngOnInit(): void {
  }

  submit() {
    console.log('Selected Options:', this.selectedOptions);
    // Ici, vous pouvez effectuer des actions avec les options sélectionnées, comme les envoyer à un service, etc.
  }

}
