import { Routes } from '@angular/router';

import { StaticComponent } from '../../pages/static/static.component';
import { DetailsComponent } from '../../pages/static/details/details.component';
import { ValidationComponent } from '../../pages/validation/validation.component';


export const AdminLayoutRoutes: Routes = [
  { path: 'static', component: StaticComponent },
  { path:  'details/: id', component: DetailsComponent },
  { path: 'valide', component: ValidationComponent }

];
