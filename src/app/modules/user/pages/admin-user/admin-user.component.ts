import {Component, ViewChild} from '@angular/core';
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
export class AdminUserComponent {
  public formUser: FormGroup;
  usuarios: AdminUsuario[] = [];

  displayedColumns: string[] = ['nombre', 'usuario', 'rol', 'estado', 'acciones'];
  dataSource: MatTableDataSource<AdminUsuario> | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private fb: FormBuilder,
    private alerta: AlertaService
  ) {
    this.formUser = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zÑñÁÉÍÓÚáéíóú ]+$'), Validators.maxLength(50), Validators.minLength(3)]],
      usuario: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]],
      rol: ['', [Validators.required]],
      estado: ['', [Validators.required]],
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

  async registrarUsuario(){
    const condicion: boolean = this.formUser.invalid;

    if (condicion) {
      Object.values(this.formUser.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log('usuario registrado');

    }
  }

  editarUsuario(medicionId: string){

  }

  async eliminarUsuario(medicionId: string) {

  }
}
