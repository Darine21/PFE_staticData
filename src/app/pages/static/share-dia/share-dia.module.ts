import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ShareDiaComponent } from './share-dia.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShareDiaComponent
  ],
  imports: [
    CommonModule,
   // NgMultiSelectDropDownModule.forRoot(),
    FormsModule
  ],
  exports: [
    ShareDiaComponent
  ]
})
export class ShareDiaModule { }
