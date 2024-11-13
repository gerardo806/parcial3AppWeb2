import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioImp} from '../../models/signin/imp/usuarioImp';

@Injectable({
  providedIn: 'root'
})
export class ConfigDbService {

  private uri: string = 'https://empleadosucad-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) { }

  saveData(data: UsuarioImp){
    return this.http.post(this.uri + 'usuarios.json', data.getUsuario());
  }
}
