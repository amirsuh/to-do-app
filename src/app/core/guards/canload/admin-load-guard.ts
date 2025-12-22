import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const adminLoadGuard: CanMatchFn  = (route, state) => {
 const router = inject(Router);
  const isAdmin = localStorage.getItem('role') === 'admin';
  return isAdmin ? true : router.parseUrl('/forbidden');

};
