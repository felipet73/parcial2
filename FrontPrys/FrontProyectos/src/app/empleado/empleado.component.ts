import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoService } from '../Services/empleado.service';
import { RouterLink } from '@angular/router';
import { IEmpleado } from '../interfaces/iempleado';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

declare const Swal: any;

@Component({
  selector: 'app-empleado',
  standalone:true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink,],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css',
})
export class EmpleadoComponent {
  lista_empleados$!: IEmpleado[];
  emailuser: string = '';
  constructor(private empleadoServicio: EmpleadoService) {

  }

  ngOnInit() {
    this.cargaTabla();
    /*this.emailuser = localStorage.getItem('User') || '';
    if (this.emailuser == '') {
      location.href = '/login';
    }*/

  }
  cargaTabla() {
    this.empleadoServicio.todos().subscribe((empleados) => {
      this.lista_empleados$ = empleados;
    });
  }

  eliminarEmpleado(id: number) {
    Swal.fire({
      title: 'Empleados',
      text: 'Esta seguro que desea eliminar este empleado?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#838688ff',
      confirmButtonText: 'Eliminar!!!!!!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.empleadoServicio.eliminarempleado(id).subscribe((id) => {
          if (id > 0) {
            this.cargaTabla();
            Swal.fire(
              'Empleado Eliminado!',
              'Gracias por confiar en nuestros servicios!.',
              'success'
            );
          }
        });
      }
    });
  }

  
}
