using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Timers;
using BackendProyectos.Models.Entidades;
using BackendProyectos.Models.Entidades.Base;

namespace Tipo_Datos.Models.Entidades
{
    [Table("Empleado")]
    public class EmpleadoModel: BaseModel
    {
        [Required(ErrorMessage = "Cammpo Requerido")]
        public string Nombres { get; set; }
        [Required(ErrorMessage = "Cammpo Requerido")]
        public string Apellidos { get; set; }
        [EmailAddress(ErrorMessage ="El formato no de correo electronico")]
        [Required(ErrorMessage ="El campo es requerido")]
        public string Email { get; set; }
        [Required(ErrorMessage = "El campo es requerido")]
        public string Posicion { get; set; }
    }
}
