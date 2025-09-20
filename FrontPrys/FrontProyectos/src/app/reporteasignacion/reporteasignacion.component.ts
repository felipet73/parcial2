import { AsignacionService } from './../Services/asignacion.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoService } from '../Services/empleado.service';
import { ProyectoService } from '../Services/proyecto.service';
import { RouterLink } from '@angular/router';
import { IEmpleado } from '../interfaces/iempleado';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProyecto } from '../interfaces/iproyecto';
import { IAsignacion } from '../interfaces/iasignacion';

declare const Swal: any;

@Component({
  selector: 'app-reporte-asignacion',
  standalone:true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './reporteasignacion.component.html',
})
export class ReporteAsignacionComponent {
  lista_empleados$!: IEmpleado[];
  lista_proyectos$!: IProyecto[];
  lista_asignaciones$!: IAsignacion[];

  constructor(private empleadoServicio: EmpleadoService,
    private proyectoServicio: ProyectoService,
    private asignacionServicio: AsignacionService) {
      this.cargaTablas();
    }

  ngOnInit() {
    this.cargaTablas();
  }

  cargaTablas() {
    this.empleadoServicio.todos().subscribe((empleados) => {
      this.lista_empleados$ = empleados;
    });
    this.proyectoServicio.todos().subscribe((proyectos) => {
      this.lista_proyectos$ = proyectos;
    });
    this.asignacionServicio.todos().subscribe((asignaciones) => {
      this.lista_asignaciones$ = asignaciones;
    });

  }

  NombreProyecto(idProyecto:string) {
    console.log(idProyecto)
    return  this.lista_proyectos$.find(pr=>pr.id === Number(idProyecto))?.nombre;
  } 
  DescripcionProyecto(idProyecto:string) {
    return  this.lista_proyectos$.find(pr=>pr.id === Number(idProyecto))?.descripcion;
  } 

  NombresEmpleado(idEmpleado:string) {
    return  this.lista_empleados$.find(pr=>pr.id === Number(idEmpleado))?.nombres;
  } 
  ApellidosEmpleado(idEmpleado:string) {
    return  this.lista_empleados$.find(pr=>pr.id === Number(idEmpleado))?.apellidos;
  } 
  PosicionEmpleado(idEmpleado:string) {
    return  this.lista_empleados$.find(pr=>pr.id === Number(idEmpleado))?.posicion;
  } 
  
    
}
