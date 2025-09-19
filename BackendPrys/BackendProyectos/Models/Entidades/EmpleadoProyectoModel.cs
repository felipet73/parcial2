using System.ComponentModel.DataAnnotations.Schema;
using BackendProyectos.Models.Entidades;
using BackendProyectos.Models.Entidades.Base;

namespace Tipo_Datos.Models.Entidades
{
    [Table("EmpleadoProyecto")]
    public class EmpleadoProyectoModel: BaseModel
    {
        public int EmpleadoId { get; set; }

        public int ProyectoId { get; set; }

        public DateTime FechaAdignacion { get; set; }
    }
}
