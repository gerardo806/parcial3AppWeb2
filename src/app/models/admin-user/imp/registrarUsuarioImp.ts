import {RegistrarUsuario} from '../registrarUsuario';
import {Usuario} from '../../signin/usuario';
import {UsuarioImp} from '../../signin/imp/usuarioImp';

export class RegistrarUsuarioImp implements RegistrarUsuario{
    id?: string;
    nombre: string;
    usuario: string;
    rol: string;
    clave: string;
    confirmarClave: string;
    estado: boolean;

    constructor(id: string, nombre: string, usuario: string, rol: string, clave: string, confirmarClave: string, estado: boolean){
        this.id = id;
        this.nombre = nombre;
        this.usuario = usuario;
        this.rol = rol;
        this.clave = clave;
        this.confirmarClave = confirmarClave;
        this.estado = estado;
    }

    getRegistroUsuario(): RegistrarUsuario{
        return {
            id: this.id,
            nombre: this.nombre,
            usuario: this.usuario,
            rol: this.rol,
            clave: this.clave,
            confirmarClave: this.confirmarClave,
            estado: this.estado
        }
    }

    getUsuario(): Usuario{
      const usuario: UsuarioImp = new UsuarioImp(this.id, this.nombre, this.rol, this.usuario, this.clave, this.estado);
      return usuario.getUsuario();
    }
}
