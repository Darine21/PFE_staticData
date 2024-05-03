import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DialogsComponent } from './dialogue/dialogue.component';
import { DetailsComponent } from './details/details.component';
import { StaticRoutingModule } from './static-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ListeValuesComponent } from './liste-values/liste-values.component';



@NgModule({
  declarations: [
    DialogsComponent,
    ListeValuesComponent,
    //DetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StaticRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    
    //SharedModule
  ]
})
export class StaticModule { }
