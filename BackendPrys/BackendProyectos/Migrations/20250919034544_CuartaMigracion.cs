using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendProyectos.Migrations
{
    /// <inheritdoc />
    public partial class CuartaMigracion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmpleadoModelProyectosModel");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmpleadoModelProyectosModel",
                columns: table => new
                {
                    Empleados_AsignadosId = table.Column<int>(type: "int", nullable: false),
                    Proyectos_AsignadosId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmpleadoModelProyectosModel", x => new { x.Empleados_AsignadosId, x.Proyectos_AsignadosId });
                    table.ForeignKey(
                        name: "FK_EmpleadoModelProyectosModel_Empleado_Empleados_AsignadosId",
                        column: x => x.Empleados_AsignadosId,
                        principalTable: "Empleado",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmpleadoModelProyectosModel_Proyecto_Proyectos_AsignadosId",
                        column: x => x.Proyectos_AsignadosId,
                        principalTable: "Proyecto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmpleadoModelProyectosModel_Proyectos_AsignadosId",
                table: "EmpleadoModelProyectosModel",
                column: "Proyectos_AsignadosId");
        }
    }
}
