import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AdminUsuario} from '../../../../models/admin-user/adminUsuario';
import {AlertaService} from '../../../../services/sweetAlert/alerta.service';
import * as bcrypt from 'bcryptjs';
import {RegistrarUsuarioImp} from '../../../../models/admin-user/imp/registrarUsuarioImp';
import {ConfigDbService} from '../../../../services/firebase/config-db.service';
import {Usuario} from '../../../../models/signin/usuario';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent implements OnInit {
  public formUser: FormGroup;
  usuarios: AdminUsuario[] = [];

  displayedColumns: string[] = ['nombre', 'usuario', 'rol', 'estado', 'acciones'];
  dataSource: MatTableDataSource<AdminUsuario> | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private fb: FormBuilder,
    private alerta: AlertaService,
    private db: ConfigDbService
  ) {
    this.formUser = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zÑñÁÉÍÓÚáéíóú ]+$'), Validators.maxLength(50), Validators.minLength(3)]],
      usuario: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$'), Validators.maxLength(20), Validators.minLength(5)]],
      rol: [''],
      clave: ['', [Validators.required, Validators.minLength(4)]],
      confirmarClave: ['', [Validators.required, Validators.minLength(4)]],
      estado: [''],
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource){
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource!.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  public get formUserControls(): any {
    return this.formUser.controls;
  }

  limpiarFormulario(){
    this.formUser.reset();
  }

  obtenerUsuarios(){
    this.db.getAllData('usuarios').subscribe(
      (data: any) => {
        if(data){
          console.log(data);
          this.usuarios = Object.values(data);
          this.dataSource = new MatTableDataSource(this.usuarios);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (error: any) => {
        this.alerta.error('¡Error!', 'No se pudo obtener los usuarios');
        console.log(error);
      }
    );
  }

  async registrarUsuario(){
    try{
      const condicion: boolean = this.formUser.invalid;

      if (condicion) {
        Object.values(this.formUser.controls).forEach(control => {
          control.markAsTouched();
        });
      }else{
        if(this.formUser.value.clave !== this.formUser.value.confirmarClave){
          this.alerta.warning('¡Advertencia!', 'Las contraseñas no coinciden');
        }
        else{
          const usuarioExistente = await firstValueFrom(this.db.getDataByField(this.formUser.value.usuario, 'usuario', 'usuarios'));

          if (usuarioExistente && Object.keys(usuarioExistente).length > 0) {
            this.alerta.warning('¡Advertencia!', 'El usuario ya existe');
            return;
          }

          const salt = await bcrypt.genSalt(10);
          const hashedClave = await bcrypt.hash(this.formUser.value.clave, salt);

          const nuevoUsuario: RegistrarUsuarioImp = new RegistrarUsuarioImp(
            this.formUser.value.id || null,
            this.formUser.value.nombre,
            this.formUser.value.usuario,
            this.formUser.value.rol || 'invitado',
            hashedClave,
            hashedClave,
            this.formUser.value.estado || true
          );

          this.db.saveData(nuevoUsuario.getRegistroUsuario(), 'usuarios').subscribe(
            (data: any) => {
              this.alerta.success('¡Éxito!', 'Usuario registrado correctamente');
              //this.limpiarFormulario();
              const $cerrarModalUsuario = document.getElementById('cerrar-modal-usuario');
              if($cerrarModalUsuario){
                $cerrarModalUsuario.click();
              }
              this.obtenerUsuarios();
            },
            (error: any) => {
              this.alerta.error('¡Error!', 'No se pudo registrar el usuario');
              console.log(error);
            }
          );
        }
      }
    }
    catch (error){
      this.alerta.error('¡Error!', 'Ocurrio un error fatal durante el registro');
      console.log(error);
    }
  }

  editarUsuario(medicionId: string){

  }

  async eliminarUsuario(medicionId: string) {

  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }
}
