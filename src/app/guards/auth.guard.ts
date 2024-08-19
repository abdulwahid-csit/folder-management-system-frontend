import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStoreService } from '../shared/services/local-store.service';

export const authGuard: CanActivateFn = (route, state) => {
  const localStoreService = inject(LocalStoreService);
  const router = inject(Router);

  const redirectUrl = state.url

  if (localStoreService.getItem('access_token')) {
    return true;

  } else {
    localStoreService.removeItem();
    router.navigate(['/login'], { queryParams: { returnUrl: redirectUrl } });
    return false;
  }
};
