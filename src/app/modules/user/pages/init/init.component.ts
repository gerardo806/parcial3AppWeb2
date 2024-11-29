import { Component } from '@angular/core';
import {SessionDataService} from '../../services/session-data.service';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent {
  private username: string = '';
  constructor(private sesionData: SessionDataService) {
    this.username = sesionData.getUsername();
    this.username = this.username.split('@')[0];
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
  }
}
