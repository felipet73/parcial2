import { Routes } from '@angular/router';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { NuevoProyectoComponent } from './proyecto/nuevo-proyecto/nuevo-proyecto.component';
import { NuevoEmpleadoComponent } from './empleado/nuevo-empleado/nuevo-empleado.component';

export const routes: Routes = [  
  {
    path: 'empleados',
    component: EmpleadoComponent,
  },
  {
    path: 'proyectos',
    component: ProyectoComponent,
  },
{
    path: 'nuevo-proyecto',
    component: NuevoProyectoComponent,
    pathMatch: 'full',
  },
  {
    path: 'editar-proyecto/:parametro',
    component: NuevoProyectoComponent,
    pathMatch: 'full',
  },
  {
    path: 'nuevo-empleado',
    component: NuevoEmpleadoComponent,
    pathMatch: 'full',
  },
  {
    path: 'editar-empleado/:parametro',
    component: NuevoEmpleadoComponent,
    pathMatch: 'full',
  },
];
