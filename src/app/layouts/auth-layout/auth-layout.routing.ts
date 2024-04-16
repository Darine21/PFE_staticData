import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/account/login/login.component';
import { RegisterComponent } from '../../pages/account/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent }
];
