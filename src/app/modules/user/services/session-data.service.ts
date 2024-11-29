import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {
  private username: string = '';
  constructor() { }

  public setUsername(username: string): void {
    this.username = username;
    localStorage.setItem('username', username);
  }

  public getUsername(): string {
    if (this.username === '') {
      this.username = localStorage.getItem('username') || '';
    }

    return this.username;
  }
}
