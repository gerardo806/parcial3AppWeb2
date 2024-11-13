import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ConfigDbService} from '../../../../services/firebase/config-db.service';
import {UsuarioImp} from '../../../../models/signin/imp/usuarioImp';
import {HttpClientModule} from '@angular/common/http';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  private usuario: UsuarioImp;
  constructor(private http: ConfigDbService) {
    this.usuario = new UsuarioImp('nombre1', 'apellido1', 'usuario1', 'clave1', true);
  }

  ngOnInit(): void {
    //this.guardarUsuario();
  }

  guardarUsuario(){
    this.http.saveData(this.usuario).subscribe(data => {
      console.log(data);
    });
  }
}