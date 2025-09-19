namespace BackendProyectos.Models.Entidades
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using BackendProyectos.Models.Entidades.Base;
    using Tipo_Datos.Models.Entidades;

    [Table("Proyecto")]
    public class ProyectosModel:BaseModel
    {
        [Required(ErrorMessage ="Cammpo Requerido")]
        public string Nombre { get; set; } 
        [Required(ErrorMessage = "Cammpo Requerido")]        
        public string Descripcion { get; set; } 
        [Required(ErrorMessage = "Cammpo Requerido")]
        public string FechaInicio { get; set; }
        [Required(ErrorMessage = "Cammpo Requerido")]
        public string FechaFin { get; set; }
        public ICollection<EmpleadoModel> Empleados_Asignados { get; set; }
        public ProyectosModel()
        {
            Empleados_Asignados = new List<EmpleadoModel>();
        }
    }
}
