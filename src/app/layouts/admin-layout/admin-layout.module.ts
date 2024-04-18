import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { StaticComponent } from '../../pages/static/static.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from '../../pages/static/details/details.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    StaticComponent,
    //DetailsComponent
  ],
  declarations: [
    
  ]
})

export class AdminLayoutModule {}
