import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn= !!localStorage.getItem('user')

  if(isLoggedIn){
    return true
  }else{
    router.navigate(['/home'])
    return false;
  }
};
