import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const childAuthGuard: CanActivateChildFn  = (route, state) => {
  const router = inject(Router);
  const userRole = localStorage.getItem('role')
  if(userRole!=='Admin'){
    router.navigate(['/home']);
    return false
  }
    return true

}
