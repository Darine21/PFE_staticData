import { Routes } from '@angular/router';

import { StaticComponent } from '../../pages/static/static.component';
import { DetailsComponent } from '../../pages/static/details/details.component';
import { ValidationComponent } from '../../pages/validation/validation.component';
import { ShareDialogComponent } from '../../pages/validation/share/share.component';
import { ComplaintComponent } from '../../pages/validation/complaint/complaint.component';
import { CardRejectedComponent } from '../../pages/validation/card-rejected/card-rejected.component';
import { CardValidationComponent } from '../../pages/validation/card-validation/card-validation.component';
import { CardSharingComponent } from '../../pages/validation/card-sharing/card-sharing.component';
import { ReasonDialogComponent } from '../../pages/validation/reject-dia/reason-dialog/reason-dialog.component';
import { CreateEntityComponent } from '../../pages/create-entity/create-entity.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { AdminLocalComponent } from '../../pages/admin-local/admin-local.component';
import { DetailsVComponent } from '../../pages/validation/details-v/details-v.component';
import { DetailsLocalComponent } from '../../pages/admin-local/details-local/details-local.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'static', component: StaticComponent },
  { path:  'details/: id', component: DetailsComponent },
  { path: 'valide', component: ValidationComponent },
 
  { path: 'complaint', component: ComplaintComponent },
  { path: 'rejected', component: CardRejectedComponent },
  { path: 'card-val', component: CardValidationComponent },
  { path: 'card-share', component: CardSharingComponent },
  { path: 'create-entity', component: CreateEntityComponent },
  { path: 'Profil', component: UserProfileComponent },
  { path: 'local-user', component: AdminLocalComponent },
  { path: 'detailsV/:id', component: DetailsVComponent },
  { path: 'detail-local', component: DetailsLocalComponent },
 

];
