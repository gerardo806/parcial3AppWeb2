import { Component } from '@angular/core';
import {SessionDataService} from '../../modules/user/services/session-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private username: string = '';
  constructor(
    private sessionDataService: SessionDataService,
    private router: Router
  ) {
    this.username = sessionDataService.getUsername();
    this.username = this.username.split('@')[0];
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  logout(): void {
    this.sessionDataService.setUsername('');
    localStorage.removeItem('username');
    localStorage.removeItem('login');
    this.router.navigate(['/credenciales/iniciar-sesion']);
  }
}
