import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogsComponent } from './pages/static/dialogue/dialogue.component';
import { DetailsComponent } from './pages/static/details/details.component';
import { CollapseModule } from 'ng-uikit-pro-standard';
//import { ShareDiaComponent } from './pages/static/share-dia/share-dia.component';
import { ValidationComponent } from './pages/validation/validation.component';
import { RejectDiaComponent } from './pages/validation/reject-dia/reject-dia.component';
import { ValidDiaComponent } from './pages/validation/valid-dia/valid-dia.component';
import { ToastrModule } from 'ngx-toastr';
import { ShareDialogComponent } from './pages/validation/share/share.component';
import { MultiSelectComponent, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ComplaintComponent } from './pages/validation/complaint/complaint.component';
import { MessageDialogComponent } from './pages/validation/message/message.component'
import { MatIconModule } from '@angular/material/icon';
import { CardRejectedComponent } from './pages/validation/card-rejected/card-rejected.component';
//import { ValidDiaComponent } from './pages/validation/valid-dia/valid-dia.component';
//import { MdbTabsModule, MdbTabModule } from 'angular-bootstrap-md';
//import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardValidationComponent } from './pages/validation/card-validation/card-validation.component';
import { CardSharingComponent } from './pages/validation/card-sharing/card-sharing.component';
import { StaticComponent } from './pages/static/static.component';
import { ReasonDialogComponent } from './pages/validation/reject-dia/reason-dialog/reason-dialog.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEntityComponent } from './pages/create-entity/create-entity.component';

import { AdminLocalComponent } from './pages/admin-local/admin-local.component';
import { DialogEComponent } from './pages/create-entity/dialog-e/dialog-e.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { DialogSpecComponent } from './pages/admin-local/dialog-spec/dialog-spec.component';
import { MapsComponent } from './pages/maps/maps.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CustomDatePipe } from './custom-date.pipe';
//import { I18nService } from './pages/static/details/Translate.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AuthInterceptor } from './Auth.gard';
import { NotificationComponent } from './pages/static/details/notification/notification.component';
import { NotificationService } from './pages/static/details/notification.service';
import { CreationEComponent } from './pages/create-entity/creation-e/creation-e.component';
import { ConfirmationDialogComponent } from './pages/static/confirmation-dialog/confirmation-dialog.component';
import { DetailsLocalComponent } from './pages/admin-local/details-local/details-local.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationSComponent } from './pages/validation/share/notification-s/notification-s.component';
import { NotificationEComponent } from './pages/create-entity/notification-e/notification-e.component';
import { ShareVComponent } from './pages/validation/details-v/share-v/share-v.component';
import { AccountService } from './pages/account/account.service';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    NgbModalModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    CollapseModule.forRoot(),
    ReactiveFormsModule,
  
    AngularMultiSelectModule,
    MultiSelectModule,
    MatIconModule,
    MatExpansionModule,
  
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
   AgmCoreModule.forRoot({
     
     apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
   }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center', // Position en haut de la page, centré
      closeButton: true, // Bouton de fermeture
      timeOut: 3000, // Durée d'affichage en millisecondes
      preventDuplicates: true, // Empêcher les duplications
    }),
    MatSnackBarModule,
 
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    StaticComponent,
    CustomDatePipe,
    ValidationComponent,
    RejectDiaComponent,
    ValidDiaComponent,
    ShareDialogComponent,
    ComplaintComponent,
    MessageDialogComponent,
    CardRejectedComponent,
    CardValidationComponent,
    CardSharingComponent,
    ReasonDialogComponent,
    CreateEntityComponent,
    AdminLocalComponent,
    DialogEComponent,

    UserProfileComponent,
    DialogSpecComponent,
    MapsComponent,
    CustomDatePipe,
    NotificationComponent,
    CreationEComponent,
    ConfirmationDialogComponent,
    DetailsLocalComponent,
    NotificationEComponent,
    ShareVComponent,
    NotificationSComponent
    //ValidDiaComponent,
    //ShareDiaComponent,
    //DetailsComponent,
    //DetailsComponent,
  ],
  providers: [
  
    {  
      provide: HTTP_INTERCEPTORS,
      useClass: AccountService,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    NotificationService
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
