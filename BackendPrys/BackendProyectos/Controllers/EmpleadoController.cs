using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendProyectos.Data;
using Tipo_Datos.Models.Entidades;

namespace BackendProyectos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly DataDbContext _context;

        public EmpleadoController(DataDbContext context)
        {
            _context = context;
        }

        // GET: api/Empleado
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmpleadoModel>>> GetEmpleados()
        {
            return await _context.Empleados.ToListAsync();
        }

        // GET: api/Empleado/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmpleadoModel>> GetEmpleadoModel(int id)
        {
            var empleadoModel = await _context.Empleados.FindAsync(id);

            if (empleadoModel == null)
            {
                return NotFound();
            }

            return empleadoModel;
        }

        // PUT: api/Empleado/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmpleadoModel(int id, EmpleadoModel empleadoModel)
        {
            if (id != empleadoModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(empleadoModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpleadoModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Empleado
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EmpleadoModel>> PostEmpleadoModel(EmpleadoModel empleadoModel)
        {
            _context.Empleados.Add(empleadoModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmpleadoModel", new { id = empleadoModel.Id }, empleadoModel);
        }

        // DELETE: api/Empleado/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmpleadoModel(int id)
        {
            var empleadoModel = await _context.Empleados.FindAsync(id);
            if (empleadoModel == null)
            {
                return NotFound();
            }

            _context.Empleados.Remove(empleadoModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmpleadoModelExists(int id)
        {
            return _context.Empleados.Any(e => e.Id == id);
        }
    }
}
