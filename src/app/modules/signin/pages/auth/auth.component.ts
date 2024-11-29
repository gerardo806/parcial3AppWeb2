import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {ConnectConfigDbService} from '../../../../services/firebase/connect-config-db.service';
import {autenticarUsuarioImp} from '../../../../models/signin/imp/autenticarUsuarioImp';
import {autenticarUsuario} from '../../../../models/signin/autenticarUsuario';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, Auth, UserCredential } from 'firebase/auth';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthUserService} from '../../../../services/firebase/auth/auth-user.service';
import {SessionDataService} from '../../../user/services/session-data.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  public formUser: FormGroup;
  constructor(
    private configDb: ConnectConfigDbService,
    private fb: FormBuilder,
    private router: Router,
    private authUserService: AuthUserService,
    private userSession: SessionDataService
  ) {
    this.formUser = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      clave: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  async login(){
    const usuario: autenticarUsuarioImp = new autenticarUsuarioImp(this.formUser.value.correo, this.formUser.value.clave);
    const credential: autenticarUsuario = usuario.getCredenciales();
    const app = this.configDb.initDb();
    const auth = getAuth(app);

    try{
      const userCredential: UserCredential = await this.loginEmail(auth, credential.email, credential.password);

      if(userCredential.user){
        this.userSession.setUsername(credential.email);
        this.authUserService.setLogin(true);
        await this.router.navigate(['/usuario/inicio']);
        return;
      }

      this.authUserService.setLogin(false);
    }catch (e){
      console.error(e);
    }
  }

  private async loginEmail(auth: Auth, email: string, password: string): Promise<UserCredential>{
    return await signInWithEmailAndPassword(auth, email, password);
  }

  public get formUserControls(): any {
    return this.formUser.controls;
  }

  limpiarFormulario(){
    this.formUser.reset();
  }
}
