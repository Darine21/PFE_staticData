import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-liste-values',
  templateUrl: './liste-values.component.html',
  styleUrls: ['./liste-values.component.scss']
})
export class ListeValuesComponent implements OnInit {
  itemDictionary: { [key: string]: string } = {}; // Dictionnaire pour stocker les valeurs
  keys: string[] = []; // Liste des clés du dictionnaire

  constructor() { }

  ngOnInit(): void {
    // Vous pouvez initialiser le dictionnaire avec des valeurs par défaut si nécessaire
    this.itemDictionary['key1'] = 'value1';
    this.itemDictionary['key2'] = 'value2';
    // Mettre à jour la liste des clés
    this.keys = Object.keys(this.itemDictionary);
  }

  // Méthode pour ajouter un nouvel élément au dictionnaire
  addItem(key: string, value: string) {
    this.itemDictionary[key] = value;
    // Mettre à jour la liste des clés
    this.keys = Object.keys(this.itemDictionary);
  }

  // Méthode pour supprimer un élément du dictionnaire
  removeItem(key: string) {
    delete this.itemDictionary[key];
    // Mettre à jour la liste des clés
    this.keys = Object.keys(this.itemDictionary);
  }
}
