import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

export const roleGuardChild: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  const expectedRoles = route.parent?.data['expectedRoles'] as Array<string> || [];
  const userRole = authService.getUserRole();

  if (expectedRoles.includes(userRole) || userRole === 'Master') {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};

