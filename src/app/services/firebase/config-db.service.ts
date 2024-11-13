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

  getAllData(collection: string){
    return this.http.get(this.uri + collection + '.json');
  }

  getDataByField(value: string, field: string, collection: string) {
    const url = `${this.uri}${collection}.json?orderBy="${field}"&equalTo="${value}"`;
    console.log(url);
    return this.http.get<any[]>(url);
  }

}
