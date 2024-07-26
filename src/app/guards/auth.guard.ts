import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../api-service/api.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const router = inject(Router);
  if(apiService.isAuth()) {
    return true;    
  }
  else {
    router.navigateByUrl('');
    return false;
  }
};
