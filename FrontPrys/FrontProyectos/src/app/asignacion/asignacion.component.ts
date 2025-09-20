
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsignacionService } from '../Services/asignacion.service';
import { EmpleadoService } from './../Services/empleado.service';
import { ProyectoService } from '../Services/proyecto.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
declare const Swal: any;

@Component({
  selector: 'app-nuevo-cliente',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './asignacion.component.html',
})
export class AsignacionComponent implements OnInit {
  emailuser: string = '';
  asignacionforms: FormGroup = new FormGroup({});
  titulo_formulario = 'Asignar empleado a Proyecto';
  empleadoid: number = 0;
  proyectoid: number = 0;
  constructor(
    private empleadoServicio: EmpleadoService,
    private proyectoServicio: ProyectoService,
    private asignacionServicio: AsignacionService,
    private navegacion: Router,
    private parametros: ActivatedRoute
  ) {
   

    this.asignacionforms = new FormGroup({
      proyectoid: new FormControl('', [Validators.required]),
      nombre: new FormControl('', []),
      descripcion: new FormControl('', []),
      empleadoid: new FormControl('', [Validators.required]),
      nombres: new FormControl('', []),
      apellidos: new FormControl('', []),
      posicion: new FormControl('', []),
    });
    this.parametros.params.subscribe((parametros) => {
      if (parametros['parametro']) {
        //actualizar
        this.titulo_formulario = 'Actualizar datos de empleado';
        //this.id = parametros['parametro'];
        //this.Editar = true;
        this.empleadoServicio.unempleado(this.empleadoid).subscribe((empleado) => {
          this.asignacionforms.patchValue(empleado);
        });
        this.proyectoServicio.unProyecto(this.proyectoid).subscribe((proyecto) => {
          this.asignacionforms.patchValue(proyecto);
        });

      } else {
        this.asignacionforms.reset();
      }
    });
  }

  ngOnInit() {
  
  }

  buscarProyecto(event: KeyboardEvent){
    const idProyecto = (event.target as HTMLInputElement).value;
    console.log("Tecla presionada:", event.key);
    console.log("Valor actual:", idProyecto);
    //if (event.key=='Enter'){
    if (idProyecto!=''){
       this.proyectoServicio.unProyecto( Number(idProyecto) ).subscribe((proyecto) => {
          console.log('proyecto recibido',proyecto);
          this.asignacionforms.patchValue(proyecto);
        });
    }
  }

  buscarEmpleado(event: KeyboardEvent){
    const idEmpleado = (event.target as HTMLInputElement).value;
      console.log("Tecla presionada:", event.key);
      console.log("Valor actual:", idEmpleado);
      //if (event.key=='Enter'){
      if (idEmpleado!=''){
            this.empleadoServicio.unempleado( Number(idEmpleado) ).subscribe((empleado) => {
            console.log('empleado recibido',empleado);
            this.asignacionforms.patchValue(empleado);
          });
      }
  }

  guardarAsignacion() {
    if (this.asignacionforms.invalid) {
      console.log('Formulario invalido');
      return;
    }
    Swal.fire({
      title: 'Desea guardar la informacion de la asignacion?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
      icon: 'question',
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
          const asignacion = this.asignacionforms.value;
          this.asignacionServicio
            .guardarAsignacion(asignacion)
            .subscribe((unasignacion) => {
              Swal.fire('Asignacion', 'Se guardo con exito', 'success');
              this.asignacionforms.reset();
              this.navegacion.navigate(['asignacion']);
            });
      } else if (result.isDenied) {
        Swal.fire('Asignacion', 'La operacion se ha cancelado', 'success');
      }
    });
  }
}
