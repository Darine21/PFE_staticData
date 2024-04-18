import { Component, OnInit } from '@angular/core';
import { DialogsComponent } from '../../dialogue/dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { CollapseModule } from 'ng-uikit-pro-standard';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  data: any[] = [];
  filteredData: any[];
  isNavbarCollapsed = true;
  selectedNavItem: string | null = null;
  activeLineIndex: number = 0;
  selectedDate: string = '';
  creationDate: NgbDateStruct;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    // Initialisation
  }
  isValuesSelected: boolean = false;


  selectValues() {
    this.isValuesSelected = !this.isValuesSelected;
    // Autres actions à effectuer lorsque vous cliquez sur "Values"
  }
  isItemSelected(item: string): boolean {
    // Retourne true si l'élément spécifié est sélectionné, sinon false
    return item === 'Values' && this.isValuesSelected;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  toggleLine(itemId: string) {
    // Masquez toutes les lignes d'abord
    document.querySelectorAll('.line').forEach((line: HTMLElement) => {
      line.style.display = 'none';
    });
    

    // Affichez la ligne sous l'élément sur lequel vous avez cliqué
    const line = document.getElementById(itemId + 'Line');
    if (line) {
      line.style.display = 'block';
    }
  }
  moveLine(index: number) {
    this.activeLineIndex = index;
  }

}
