import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { StaticComponent } from './pages/static/static.component'
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ValidationComponent } from './pages/validation/validation.component';
import { DetailsComponent } from './pages/static/details/details.component';
import { ValidDiaComponent } from './pages/validation/valid-dia/valid-dia.component';
//import { ShareComponent } from './pages/validation/share/share.component';
import { SelectMultiComponent } from './pages/validation/select-multi/select-multi.component';
import { ComplaintComponent } from './pages/validation/complaint/complaint.component';
import { RejectDiaComponent } from './pages/validation/reject-dia/reject-dia.component';
import { CardRejectedComponent } from './pages/validation/card-rejected/card-rejected.component';
import { CardValidationComponent } from './pages/validation/card-validation/card-validation.component';
import { CardSharingComponent } from './pages/validation/card-sharing/card-sharing.component';
import { ReasonDialogComponent } from './pages/validation/reject-dia/reason-dialog/reason-dialog.component';
import { CreateEntityComponent } from './pages/create-entity/create-entity.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AdminLocalComponent } from './pages/admin-local/admin-local.component';
import { MapsComponent } from './pages/maps/maps.component';
import { DetailsVComponent } from './pages/validation/details-v/details-v.component';
import { DetailsLocalComponent } from './pages/admin-local/details-local/details-local.component';
import { AuthGuard } from './pages/account/Auth';
import { ValidationLocalComponent } from './pages/admin-local/validation-local/validation-local.component';


const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },{
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  },
  {
    path: 'static',
    component: StaticComponent, canActivate: [AuthGuard], data: { role: 'AdminGlobal' } 
  },
  {
    path:'detailsV/:id',
    component: DetailsVComponent,
  },
  {
    path: 'maps',
    component: MapsComponent,
  },
  {
    path: 'Valid-SSD',
    component: ValidationLocalComponent,
  },
  {
    path: 'local-user',
    component: AdminLocalComponent,
  },
  {path: 'create-entity',
    component: CreateEntityComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: 'dia-rejecttt',
    component: ReasonDialogComponent,
  },
  {
    path: 'rejected',
    component: CardRejectedComponent,
  },
 
  {
    path: 'complaint',
    component: ComplaintComponent,
  },

  {
    path: 'select',
    component: SelectMultiComponent,
  },
  {
    path: 'valid-dia',
    component: ValidDiaComponent
  },
  {
    path: 'detail-local',
    component: DetailsLocalComponent
  },
  {
    path: 'card-val',
    component: CardValidationComponent
  },
  {
    path: 'card-share',
    component: CardSharingComponent
  },
  {
    path: 'valide',
    component: ValidationComponent, canActivate: [AuthGuard], data: { role: 'CheckerGlobal' }
  },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'Profil', component: UserProfileComponent },
  { path: 'reject-dia', component: RejectDiaComponent },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }, {
    path: '**',
    redirectTo: 'static'
  },
  
  {
    path: '#/register',
    redirectTo: 'register',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],

})
export class AppRoutingModule { }
