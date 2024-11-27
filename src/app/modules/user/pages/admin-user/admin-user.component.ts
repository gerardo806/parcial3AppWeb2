import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

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
      pk: [''],
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zÑñÁÉÍÓÚáéíóú ]+$'), Validators.maxLength(50), Validators.minLength(3)]],
      usuario: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$'), Validators.maxLength(20), Validators.minLength(5)]],
      rol: [''],
      clave: [''],
      confirmarClave: [''],
      estado: [''],
    });

  }

  setValidatorsForCreate() {
    this.formUser.controls['clave'].setValidators([Validators.required, Validators.minLength(4)]);
    this.formUser.controls['confirmarClave'].setValidators([Validators.required, Validators.minLength(4)]);
    this.formUser.controls['clave'].updateValueAndValidity();
    this.formUser.controls['confirmarClave'].updateValueAndValidity();
  }

  setValidatorsForUpdate() {
    const optionalLengthValidator = (control: AbstractControl) => {
      if (control.value && control.value.length < 4) {
        return { minLength: { message: 'La longitud minima es de 4 caracteres' } };
      }
      return null;
    };

    this.formUser.controls['clave'].setValidators(optionalLengthValidator);
    this.formUser.controls['confirmarClave'].setValidators(optionalLengthValidator);
    this.formUser.controls['clave'].updateValueAndValidity();
    this.formUser.controls['confirmarClave'].updateValueAndValidity();
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
    if (this.formUser.value.id) {
      this.setValidatorsForUpdate();
    } else {
      this.setValidatorsForCreate();
    }

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
          const usuario: RegistrarUsuarioImp = new RegistrarUsuarioImp(
            this.formUser.value.id || null,
            this.formUser.value.nombre,
            this.formUser.value.usuario,
            this.formUser.value.rol || 'invitado',
            this.formUser.value.clave,
            this.formUser.value.confirmarClave,
            this.formUser.value.estado || true
          );

          if(!this.formUser.value.id){
            const usuarioExistente = await firstValueFrom(this.db.getDataByField(this.formUser.value.usuario, 'usuario', 'usuarios'));

            if (usuarioExistente && Object.keys(usuarioExistente).length > 0 && !this.formUser.value.id) {
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
          }else{
            const clave = this.formUser.value.pk;

            this.db.updateData(clave, usuario.getRegistroUsuario(), 'usuarios').subscribe(
              (data: any) => {
                this.alerta.success('¡Éxito!', 'Usuario actualizado correctamente');
                //this.limpiarFormulario();
                const $cerrarModalUsuario = document.getElementById('cerrar-modal-usuario');
                if($cerrarModalUsuario){
                  $cerrarModalUsuario.click();
                }
                this.obtenerUsuarios();
              },
              (error: any) => {
                this.alerta.error('¡Error!', 'No se pudo actualizar el usuario');
                console.log(error);
              }
            );
          }
        }
      }
    }
    catch (error){
      this.alerta.error('¡Error!', 'Ocurrio un error fatal durante el registro');
      console.log(error);
    }
  }

  async editarUsuario(nombreUsuario: string){
    const usuarioExistente = await firstValueFrom(
      this.db.getDataByField(nombreUsuario, 'usuario', 'usuarios')
    );

    const userPk = Object.keys(usuarioExistente)[0] as string;
    if(usuarioExistente && Object.keys(usuarioExistente).length > 0){
      const user = Object.values(usuarioExistente)[0] as Usuario;

      this.formUser.patchValue({
        id: user.usuario,
        pk: userPk,
        nombre: user.nombre,
        usuario: user.usuario,
        //rol: user.rol,
        //estado: user.estado
      });

      this.setValidatorsForUpdate();
    }
  }

  async eliminarUsuario(nombreUsuario: string) {
    const usuarioExistente = await firstValueFrom(
      this.db.getDataByField(nombreUsuario, 'usuario', 'usuarios')
    );

    const userPk = Object.keys(usuarioExistente)[0] as string;
    if(usuarioExistente && Object.keys(usuarioExistente).length > 0){
      this.alerta.question("Esta segur@?", "No se podra revertir esta acción", async () => {
        firstValueFrom(this.db.deleteData(userPk, 'usuarios')).then(() => {
          this.obtenerUsuarios();
          this.alerta.success('¡Éxito!', 'Usuario eliminado correctamente');
        }).catch((error: any) => {
          this.alerta.error('¡Error!', 'No se pudo eliminar el usuario');
          console.log(error);
        });
        });
    }
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }
}
