import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const redirectUrl = state.url

  if (authService.getAccessToken()) {
    return true;

  } else {
    authService.logout();
    router.navigate(['/login'], { queryParams: { returnUrl: redirectUrl } });
    return false;
  }
};
