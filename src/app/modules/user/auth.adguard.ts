import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthUserService} from '../../services/firebase/auth/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthUserService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      //redirigir
      this.router.navigate(['/credenciales/iniciar-sesion']);
      return false;
    }
  }
}
