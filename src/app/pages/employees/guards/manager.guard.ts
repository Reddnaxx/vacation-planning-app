import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "@pages/auth/services/auth-service/auth.service";

export const managerGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isManager$.value) {
    router.navigate(["/profile"]);
    return false;
  }

  return true;
};
