import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogsComponent } from './pages/dialogue/dialogue.component';
import { DetailsComponent } from './pages/static/details/details.component';
import { CollapseModule } from 'ng-uikit-pro-standard';
//import { MdbTabsModule, MdbTabModule } from 'angular-bootstrap-md';
//import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    CollapseModule.forRoot(),
    //MdbTabsModule,
    //MdbTabModule,
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DialogsComponent,
    //DetailsComponent,
    //DetailsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
