import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ConnectConfigDbService} from '../../../../services/firebase/connect-config-db.service';
import {AuthUserService} from '../../../../services/firebase/auth/auth-user.service';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {AlertaService} from '../../../../services/sweetAlert/alerta.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public formUser: FormGroup;

  constructor(
    private configDb: ConnectConfigDbService,
    private fb: FormBuilder,
    private router: Router,
    private alerta: AlertaService,
    private authUserService: AuthUserService
  ) {
    this.formUser = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'), Validators.minLength(6)]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      confirmarClave: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async signup() {
    if (this.formUser.value.clave !== this.formUser.value.confirmarClave) {
      this.alerta.warning('¡Advertencia!', 'Las contraseñas no coinciden');
      return;
    }

    const app = this.configDb.initDb();
    const auth = getAuth(app);

    try {
      const res = await createUserWithEmailAndPassword(auth, this.formUser.value.correo, this.formUser.value.clave);
      console.log(res);
      await this.router.navigate(['/credenciales/iniciar-sesion']);
      this.alerta.success('¡Registro exitoso!', 'Usuario registrado correctamente');
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        this.alerta.error('Error', 'El correo electrónico ya está en uso');
      } else {
        this.alerta.error('Error', 'Ocurrió un error al registrar el usuario');
      }
      console.error(e);
    }
  }

  public get formUserControls(): any {
    return this.formUser.controls;
  }

  public mostrarClaveForm(id: string): void {
    const clave = document.getElementById(id);

    if(clave){
      if(clave.getAttribute('type') === 'password'){
        clave.setAttribute('type', 'text');
        return;
      }
      clave.setAttribute('type', 'password');
    }
  }
}
