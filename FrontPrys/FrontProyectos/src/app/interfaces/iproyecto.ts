import { IEmpleado } from "./iempleado"

export interface IProyecto {
    id?:number
    nombre:string
    descripcion: string
    fechainicio: Date
    fechafin: Date
}
