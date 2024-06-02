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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    DialogsComponent,
    ListeValuesComponent,
    //DetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    StaticRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center', // Position en haut de la page, centré
      closeButton: true, // Bouton de fermeture
      timeOut: 3000, // Durée d'affichage en millisecondes
      preventDuplicates: true, // Empêcher les duplications
    }),
    MatSnackBarModule
    //SharedModule
  ]
})
export class StaticModule { }
