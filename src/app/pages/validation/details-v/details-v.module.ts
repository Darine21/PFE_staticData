import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsVComponent } from './details-v.component';
//import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
//import { ShareDiaComponent } from '../share-dia/share-dia.component';

@NgModule({
  declarations: [
    DetailsVComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    AngularMultiSelectModule,
    // MdbTabsModule
    //ShareDiaComponent
  ],
  exports: [
    DetailsVComponent,
    //ShareDiaComponent

  ]
})
export class DetailsVModule { }