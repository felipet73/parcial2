import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IAsignacion } from '../interfaces/iasignacion';

@Injectable({
  providedIn: 'root',
})
export class AsignacionService {
  private readonly rutaAPI = 'https://localhost:7187/api/EmpleadoProyecto';
  constructor(private http: HttpClient) {}

  todos(): Observable<IAsignacion[]> {
    var asignacions = this.http
      .get<IAsignacion[]>(this.rutaAPI)
      .pipe(catchError(this.manejoErrores));
      console.log(asignacions,'Asignacions');
    return asignacions;
  }
  manejoErrores(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || 'Error de red';
    return throwError(() => {
      new Error(msg);
    });
  }

  guardarAsignacion(asignacion: IAsignacion): Observable<IAsignacion> {
    return this.http
      .post<IAsignacion>(this.rutaAPI, asignacion)
      .pipe(catchError(this.manejoErrores));
  }
  actualizarAsignacion(asignacion: IAsignacion): Observable<IAsignacion> {
    return this.http
      .put<IAsignacion>(`${this.rutaAPI}/${asignacion.id}`, asignacion)
      .pipe(catchError(this.manejoErrores));
  }
  unAsignacion(id: number): Observable<IAsignacion> {
    return this.http
      .get<IAsignacion>(`${this.rutaAPI}/${id}`)
      .pipe(catchError(this.manejoErrores));
  }
  eliminarAsignacion(id:number): Observable<number>{
    return this.http
      .delete<number>(`${this.rutaAPI}/${id}`)
      .pipe(catchError(this.manejoErrores));
  }
}
