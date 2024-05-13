import { Routes } from '@angular/router';

import { StaticComponent } from '../../pages/static/static.component';
import { DetailsComponent } from '../../pages/static/details/details.component';
import { ValidationComponent } from '../../pages/validation/validation.component';
import { ShareComponent } from '../../pages/validation/share/share.component';
import { ComplaintComponent } from '../../pages/validation/complaint/complaint.component';
import { CardRejectedComponent } from '../../pages/validation/card-rejected/card-rejected.component';
import { CardValidationComponent } from '../../pages/validation/card-validation/card-validation.component';
import { CardSharingComponent } from '../../pages/validation/card-sharing/card-sharing.component';
import { ReasonDialogComponent } from '../../pages/validation/reject-dia/reason-dialog/reason-dialog.component';
import { CreateEntityComponent } from '../../pages/create-entity/create-entity.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'static', component: StaticComponent },
  { path:  'details/: id', component: DetailsComponent },
  { path: 'valide', component: ValidationComponent },
  { path: 'share', component: ShareComponent },
  { path: 'complaint', component: ComplaintComponent },
  { path: 'rejected', component: CardRejectedComponent },
  { path: 'card-val', component: CardValidationComponent },
  { path: 'card-share', component: CardSharingComponent },
  {path: 'create-entity',component: CreateEntityComponent}
];
