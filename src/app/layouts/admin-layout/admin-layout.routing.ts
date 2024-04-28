import { Routes } from '@angular/router';

import { StaticComponent } from '../../pages/static/static.component';
import { DetailsComponent } from '../../pages/static/details/details.component';
import { ValidationComponent } from '../../pages/validation/validation.component';
import { ShareComponent } from '../../pages/validation/share/share.component';
import { ComplaintComponent } from '../../pages/validation/complaint/complaint.component';


export const AdminLayoutRoutes: Routes = [
  { path: 'static', component: StaticComponent },
  { path:  'details/: id', component: DetailsComponent },
  { path: 'valide', component: ValidationComponent },
  { path: 'share', component: ShareComponent },
  { path: 'complaint', component: ComplaintComponent },

];
