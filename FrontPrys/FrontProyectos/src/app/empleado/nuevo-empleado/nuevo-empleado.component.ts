import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmpleadoService } from '../../Services/empleado.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
declare const Swal: any;

@Component({
  selector: 'app-nuevo-cliente',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nuevo-empleado.component.html',
  styleUrl: './nuevo-empleado.component.css',
})
export class NuevoEmpleadoComponent implements OnInit {
  emailuser: string = '';
  empleadoforms: FormGroup = new FormGroup({});
  titulo_formulario = 'Registro de nuevo empleado';
  id: number = 0;
  Editar: boolean = false;
  constructor(
    private empleadoServicio: EmpleadoService,
    private navegacion: Router,
    private parametros: ActivatedRoute
  ) {
   

    this.empleadoforms = new FormGroup({
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      posicion: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
    this.parametros.params.subscribe((parametros) => {
      if (parametros['parametro']) {
        //actualizar
        this.titulo_formulario = 'Actualizar datos de empleado';
        this.id = parametros['parametro'];
        this.Editar = true;
        this.empleadoServicio.unempleado(this.id).subscribe((empleado) => {
          this.empleadoforms.patchValue(empleado);
        });
      } else {
        this.empleadoforms.reset();
      }
    });
  }

  ngOnInit() {
  
  }

  guardarEmpleado() {
    if (this.empleadoforms.invalid) {
      console.log('Formulario invalido');
      return;
    }
    Swal.fire({
      title: 'Desea guardar la informacion del empleado?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
      icon: 'question',
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.Editar == true) {
          const empleado = this.empleadoforms.value;
          empleado.id = this.id;
          this.empleadoServicio
            .actualizarEmpleado(empleado)
            .subscribe((empleado) => {
              if (empleado == null) {
                Swal.fire('Empleados', 'Error al guardar', 'error');
              }
              Swal.fire('Empleados', 'Se guardo con exito', 'success');
              this.empleadoforms.reset();
              this.navegacion.navigate(['']);
            });
        } else {
          const empleado = this.empleadoforms.value;
          this.empleadoServicio
            .guardarEmpleado(empleado)
            .subscribe((unempelado) => {
              Swal.fire('Empleados', 'Se guardo con exito', 'success');
              this.empleadoforms.reset();
              this.navegacion.navigate(['empleados']);
            });
        }
      } else if (result.isDenied) {
        Swal.fire('Empleados', 'El empleado cancelo la operacion', 'success');
      }
    });
  }
}
