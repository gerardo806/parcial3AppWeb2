import { Component } from '@angular/core';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent {

}
