import {Usuario} from '../usuario';

export class UsuarioImp implements Usuario{
  constructor(nombre: string, apellido: string, usuario: string, clave: string, estado: boolean){
    this.nombre = nombre;
    this.apellido = apellido;
    this.usuario = usuario;
    this.clave = clave;
    this.estado = estado;
  }

  getUsuario(): Usuario{
    return {
      nombre: this.nombre,
      apellido: this.apellido,
      usuario: this.usuario,
      clave: this.clave,
      estado: this.estado
    }
  }

  apellido: string;
  clave: string;
  estado: boolean;
  nombre: string;
  usuario: string;
}
