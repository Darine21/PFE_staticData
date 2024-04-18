import { Routes } from '@angular/router';

import { StaticComponent } from '../../pages/static/static.component';
import { DetailsComponent } from '../../pages/static/details/details.component';


export const AdminLayoutRoutes: Routes = [
  { path: 'static', component: StaticComponent },
    { path: 'detail', component: DetailsComponent }

];
