import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProyectoService } from '../../Services/proyecto.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
declare const Swal: any;

@Component({
  selector: 'app-nuevo-proyecto',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nuevo-proyecto.component.html',
  styleUrl: './nuevo-proyecto.component.css',
})
export class NuevoProyectoComponent implements OnInit {
  emailuser: string = '';
  proyectoforms: FormGroup = new FormGroup({});
  titulo_formulario = 'Registro de nuevo proyecto';
  id: number = 0;
  Editar: boolean = false;
  constructor(
    private proyectoServicio: ProyectoService,
    private navegacion: Router,
    private parametros: ActivatedRoute
  ) {
    

    this.proyectoforms = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      fechainicio: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      fechafin: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),      
    });
    this.parametros.params.subscribe((parametros) => {
      if (parametros['parametro']) {
        //actualizar
        this.titulo_formulario = 'Actualizar datos de proyecto';
        this.id = parametros['parametro'];
        this.Editar = true;
        this.proyectoServicio.unProyecto(this.id).subscribe((proyecto) => {
          this.proyectoforms.patchValue(proyecto);
        });
      } else {
        //nuevo proyecto
        this.proyectoforms.reset();
      }
    });
  }

  ngOnInit() {
    
  }

  guardarProyecto() {
    if (this.proyectoforms.invalid) {
      console.log('Formulario invalido');
      return;
    }
    Swal.fire({
      title: 'Desea guardar la informacion del proyecto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
      icon: 'question',
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.Editar == true) {
          const proyecto = this.proyectoforms.value;
          proyecto.id = this.id;
          this.proyectoServicio
            .actualizarProyecto(proyecto)
            .subscribe((proyecto) => {
              if (proyecto == null) {
                Swal.fire('Proyectos', 'Error al guardar', 'error');
              }
              Swal.fire('Proyectos', 'Se guardo con exito', 'success');
              this.proyectoforms.reset();
              this.navegacion.navigate(['']);
            });
        } else {
          const proyecto = this.proyectoforms.value;
          this.proyectoServicio
            .guardarProyecto(proyecto)
            .subscribe((unproyecto) => {
              Swal.fire('Proyectos', 'Se guardo con exito', 'success');
              this.proyectoforms.reset();
              this.navegacion.navigate(['proyectos']);
            });
        }
      } else if (result.isDenied) {
        Swal.fire('Proyectos', 'El usuario cancelo la operacion', 'success');
      }
    });
  }
}
