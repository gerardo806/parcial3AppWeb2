import {Usuario} from '../usuario';

export class UsuarioImp implements Usuario{
  constructor(id: string | undefined, nombre: string, rol: string, usuario: string, clave: string, estado: boolean){
    this.nombre = nombre;
    this.rol = rol;
    this.usuario = usuario;
    this.clave = clave;
    this.estado = estado;
    this.id = id;
  }

  getUsuario(): Usuario{
    return {
      id: this.id,
      nombre: this.nombre,
      rol: this.rol,
      usuario: this.usuario,
      clave: this.clave,
      estado: this.estado
    }
  }

  rol: string;
  clave: string;
  estado: boolean;
  nombre: string;
  usuario: string;
  id?: string;
}
