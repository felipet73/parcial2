using Microsoft.EntityFrameworkCore;
//using BackendProyectos.Data;
using BackendProyectos.Models.Entidades;
using Tipo_Datos.Models.Entidades;
using BackendProyectos.Data;

const string DevCors = "DevCors";

var builder = WebApplication.CreateBuilder(args);
var cn = builder.Configuration.GetConnectionString("cn")
    ?? throw new InvalidOperationException("No existe la referencia a la conexion");

builder.Services.AddDbContext<DataDbContext>(opciones => opciones.UseSqlServer(cn));
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opciones => {
    opciones.AddPolicy(DevCors, policy => {
        policy
        .AllowAnyHeader()
        .AllowAnyOrigin()
        .AllowAnyMethod();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(DevCors);
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
