import {Injectable, Predicate} from '@angular/core';
import Swal from 'sweetalert2';
import {FunctionExpr} from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() { }

  error(titulo: string, mensaje: string){
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje
    });
  }

  success(titulo: string, mensaje: string){
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje
    });
  }

  warning(titulo: string, mensaje: string){
    Swal.fire({
      icon: 'warning',
      title: titulo,
      text: mensaje
    });
  }

  question(titulo: string, mensaje: string, funSuccess: Function){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: titulo,
      text: mensaje,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "¡Si, continuar!",
      cancelButtonText: "¡No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        funSuccess();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "¡Cancelado!",
          text: "Operación detenida :)",
          icon: "error"
        });
      }
    });
  }
}
