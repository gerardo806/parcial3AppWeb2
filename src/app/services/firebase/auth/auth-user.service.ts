import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private login: boolean = false;
  constructor() {
    //localStorage.setItem('login', 'false');
  }

  isAuthenticated(): boolean {
    const authenticated = localStorage.getItem('login');
    console.log(authenticated);
    if(authenticated){
      this.login = authenticated === 'true';
    }

    return this.login;
  }

  setLogin(value: boolean){
    localStorage.setItem('login', value? 'true': 'false');
    this.login = value;
  }
}
