import {autenticarUsuario} from '../autenticarUsuario';

export class autenticarUsuarioImp implements autenticarUsuario{
  constructor(email: string, password: string){
    this.email = email;
    this.password = password;
  }

  getCredenciales(): autenticarUsuario{
    return {
      email: this.email,
      password: this.password
    }
  }

  email: string;
  password: string;
}
