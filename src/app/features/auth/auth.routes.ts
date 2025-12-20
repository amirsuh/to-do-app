import { Routes } from '@angular/router';
import { Login } from './component/login/login';
import { Signup } from './component/signup/signup';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: Login, title: 'login' },
  { path: 'login', component: Signup, title: 'signup' },
];
