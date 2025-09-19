import { IEmpleado } from "./iempleado"

export interface IProyecto {
    id?:number
    nombre:string
    descripcion: string
    fechainicio: string
    fechafin: string
    empleados_asignados: IEmpleado[]
}
