import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const requiredRoles: string[] = route.data['roles']; // Roles requeridos por la ruta
    const userRole = await this.authService.getUserRole(); // Espera a que la promesa se resuelva

    if (userRole && requiredRoles.includes(userRole)) {
      return true; // El rol es válido y tiene acceso a la ruta
    }

    // Si el usuario no tiene el rol adecuado, redirigir al login
    this.router.navigate(['/login']);
    return false; // No tiene acceso a la ruta
  }
}
