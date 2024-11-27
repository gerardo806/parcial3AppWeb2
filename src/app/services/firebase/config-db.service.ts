import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioImp} from '../../models/signin/imp/usuarioImp';
import {Usuario} from '../../models/signin/usuario';

@Injectable({
  providedIn: 'root'
})
export class ConfigDbService {

  private uri: string = 'https://empleadosucad-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) { }

  saveData(data: any, collection: string){
    return this.http.post(this.uri + collection + '.json', data);
  }

  updateData(usuario: string, data: any, collection: string){
    return this.http.put(`${this.uri}${collection}/${usuario}.json`, data);
  }

  getAllData(collection: string){
    return this.http.get(this.uri + collection + '.json');
  }

  getDataByField(value: string, field: string, collection: string) {
    const url = `${this.uri}${collection}.json?orderBy="${field}"&equalTo="${value}"`;
    return this.http.get<any[]>(url);
  }

  deleteData(usuario: string, collection: string) {
    return this.http.delete(`${this.uri}${collection}/${usuario}.json`);
  }

}
