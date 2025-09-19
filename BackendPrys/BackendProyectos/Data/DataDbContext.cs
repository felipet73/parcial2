using BackendProyectos.Models.Entidades;
using Microsoft.EntityFrameworkCore;
using Tipo_Datos.Models.Entidades;

namespace BackendProyectos.Data
{
    public class DataDbContext : DbContext
    {
        public DataDbContext(DbContextOptions op) : base(op) { }
        public DbSet<EmpleadoModel> Empleados { get; set; }
        public DbSet<ProyectosModel> Proyectos { get; set; }
    }
}


