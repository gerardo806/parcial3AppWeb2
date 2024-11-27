import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ConnectConfigDbService} from '../../../../services/firebase/connect-config-db.service';
import {autenticarUsuarioImp} from '../../../../models/signin/imp/autenticarUsuarioImp';
import {autenticarUsuario} from '../../../../models/signin/autenticarUsuario';
import {createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebase from 'firebase/compat';
import UserCredential = firebase.auth.UserCredential;
import Auth = firebase.auth.Auth;

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  constructor(private configDb: ConnectConfigDbService) {
  }

  ngOnInit(): void {

  }

  async login(){
    const usuario: autenticarUsuarioImp = new autenticarUsuarioImp('admin', 'admin');
    const credential: autenticarUsuario = usuario.getCredenciales();
    const app = this.configDb.initDb();
    const auth = getAuth(app);

    try{
      const userCredential: UserCredential = await this.loginEmail(auth, credential.email, credential.password)
    }catch (e){
      console.error(e);
    }
  }

  private async loginEmail(auth: Auth, email: string, password: string): Promise<UserCredential>{
    return await createUserWithEmailAndPassword(auth, email, password);
  }

}
