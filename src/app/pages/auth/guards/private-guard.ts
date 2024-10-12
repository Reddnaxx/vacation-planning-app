import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@pages/auth/services/auth-service/auth.service";

export const privateGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated$.value) {
    return true;
  }

  return router.parseUrl("/login");
};
