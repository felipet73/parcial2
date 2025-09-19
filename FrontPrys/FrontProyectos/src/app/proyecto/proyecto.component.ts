import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProyectoService } from '../Services/proyecto.service';
import { RouterLink } from '@angular/router';
import { IProyecto } from '../interfaces/iproyecto';
import { Observable } from 'rxjs';

declare const Swal: any;

@Component({
  selector: 'app-proyecto',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.css',
})
export class ProyectoComponent {
  lista_proyectos$!: IProyecto[];
  emailuser: string = '';
  constructor(private proyectoServicio: ProyectoService) {
  }

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.proyectoServicio.todos().subscribe((proyectos) => {
      this.lista_proyectos$ = proyectos;
    });
  }

  eliminarProyecto(id: number) {
    Swal.fire({
      title: 'Proyectos',
      text: 'Esta seguro que desea eliminar este proyecto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#838688ff',
      confirmButtonText: 'Eliminar!!!!!!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.proyectoServicio.eliminarProyecto(id).subscribe((id) => {
          if (id > 0) {
            this.cargaTabla();
            Swal.fire(
              'Cliente Eliminado!',
              'Gracias por confiar en nuestros servicios!.',
              'success'
            );
          }
        });
      }
    });
  }


}
