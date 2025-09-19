import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IEmpleado } from '../interfaces/iempleado';


@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private readonly rutaAPI = 'https://localhost:7187/api/Empleado';
  //private http!: HttpClient;
  constructor(private http: HttpClient) {}

  todos(): Observable<IEmpleado[]> {
    var empleados = this.http
      .get<IEmpleado[]>(this.rutaAPI)
      .pipe(catchError(this.manejoErrores));
    return empleados;
  }
  manejoErrores(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || 'Error de red';
    return throwError(() => {
      new Error(msg);
    });
  }

  guardarEmpleado(empleado: IEmpleado): Observable<IEmpleado> {
    return this.http
      .post<IEmpleado>(this.rutaAPI, empleado)
      .pipe(catchError(this.manejoErrores));
  }
  actualizarEmpleado(empleado: IEmpleado): Observable<IEmpleado> {
    return this.http
      .put<IEmpleado>(`${this.rutaAPI}/${empleado.id}`, empleado)
      .pipe(catchError(this.manejoErrores));
  }
  unempleado(id: number): Observable<IEmpleado> {
    return this.http
      .get<IEmpleado>(`${this.rutaAPI}/${id}`)
      .pipe(catchError(this.manejoErrores));
  }
  eliminarempleado(id:number): Observable<number>{
    return this.http
      .delete<number>(`${this.rutaAPI}/${id}`)
      .pipe(catchError(this.manejoErrores));
  }
}
