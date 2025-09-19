using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendProyectos.Migrations
{
    /// <inheritdoc />
    public partial class SegundaMigracion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Empleado_Proyecto_ProyectosModelId",
                table: "Empleado");

            migrationBuilder.DropIndex(
                name: "IX_Empleado_ProyectosModelId",
                table: "Empleado");

            migrationBuilder.DropColumn(
                name: "ProyectosModelId",
                table: "Empleado");

            migrationBuilder.AlterColumn<DateTime>(
                name: "FechaInicio",
                table: "Proyecto",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "FechaFin",
                table: "Proyecto",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmpleadoModelProyectosModel");

            migrationBuilder.AlterColumn<string>(
                name: "FechaInicio",
                table: "Proyecto",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "FechaFin",
                table: "Proyecto",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<int>(
                name: "ProyectosModelId",
                table: "Empleado",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Empleado_ProyectosModelId",
                table: "Empleado",
                column: "ProyectosModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Empleado_Proyecto_ProyectosModelId",
                table: "Empleado",
                column: "ProyectosModelId",
                principalTable: "Proyecto",
                principalColumn: "Id");
        }
    }
}
