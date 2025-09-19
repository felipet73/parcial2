using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendProyectos.Migrations
{
    /// <inheritdoc />
    public partial class QuintaMigracion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadoProyecto_Empleado_EmpleadoId",
                table: "EmpleadoProyecto");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadoProyecto_Proyecto_ProyectoId",
                table: "EmpleadoProyecto");

            migrationBuilder.DropIndex(
                name: "IX_EmpleadoProyecto_EmpleadoId",
                table: "EmpleadoProyecto");

            migrationBuilder.DropIndex(
                name: "IX_EmpleadoProyecto_ProyectoId",
                table: "EmpleadoProyecto");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_EmpleadoProyecto_EmpleadoId",
                table: "EmpleadoProyecto",
                column: "EmpleadoId");

            migrationBuilder.CreateIndex(
                name: "IX_EmpleadoProyecto_ProyectoId",
                table: "EmpleadoProyecto",
                column: "ProyectoId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadoProyecto_Empleado_EmpleadoId",
                table: "EmpleadoProyecto",
                column: "EmpleadoId",
                principalTable: "Empleado",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadoProyecto_Proyecto_ProyectoId",
                table: "EmpleadoProyecto",
                column: "ProyectoId",
                principalTable: "Proyecto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
