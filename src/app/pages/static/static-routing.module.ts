import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { Dialog } from '@angular/cdk/dialog';
import { DialogsComponent } from './dialogue/dialogue.component';
import { DetailsComponent } from './details/details.component';
import { ValidationComponent } from '../validation/validation.component';
import { FormsModule } from '@angular/forms';


const router: Routes = [
  { path: 'Addition', component: DialogsComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'valide', component: ValidationComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(router)

  ],
  exports: [
    RouterModule,
    FormsModule,
  ]
})
export class StaticRoutingModule { }
