import {AdminUsuario} from '../adminUsuario';

export class AdminUsuarioImp implements AdminUsuario{
  constructor(nombre: string, usuario: string, rol: string, clave: string, estado: boolean){
    this.nombre = nombre;
    this.usuario = usuario;
    this.rol = rol;
    this.clave = clave;
    this.estado = estado;
  }

  getAdminUsuario(): AdminUsuario{
    return {
      nombre: this.nombre,
      usuario: this.usuario,
      rol: this.rol,
      clave: this.clave,
      estado: this.estado
    }
  }

  clave: string;
  estado: boolean;
  nombre: string;
  rol: string;
  usuario: string;
}
