import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProyecto } from '../interfaces/iproyecto';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private readonly rutaAPI = 'https://localhost:7187/api/Proyectos';
  constructor(private http: HttpClient) {}

  todos(): Observable<IProyecto[]> {
    var proyectos = this.http
      .get<IProyecto[]>(this.rutaAPI)
      .pipe(catchError(this.manejoErrores));
    return proyectos;
  }
  manejoErrores(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || 'Error de red';
    return throwError(() => {
      new Error(msg);
    });
  }

  guardarProyecto(proyecto: IProyecto): Observable<IProyecto> {
    return this.http
      .post<IProyecto>(this.rutaAPI, proyecto)
      .pipe(catchError(this.manejoErrores));
  }
  actualizarProyecto(proyecto: IProyecto): Observable<IProyecto> {
    return this.http
      .put<IProyecto>(`${this.rutaAPI}/${proyecto.id}`, proyecto)
      .pipe(catchError(this.manejoErrores));
  }
  unProyecto(id: number): Observable<IProyecto> {
    return this.http
      .get<IProyecto>(`${this.rutaAPI}/${id}`)
      .pipe(catchError(this.manejoErrores));
  }
  eliminarProyecto(id:number): Observable<number>{
    return this.http
      .delete<number>(`${this.rutaAPI}/${id}`)
      .pipe(catchError(this.manejoErrores));
  }
}
