export interface RegistrarUsuario{
    id?: string;
    nombre: string;
    usuario: string;
    rol: string;
    clave: string;
    confirmarClave: string;
    estado: boolean;
}
