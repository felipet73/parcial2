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
    public class EmpleadoProyectoController : ControllerBase
    {
        private readonly DataDbContext _context;

        public EmpleadoProyectoController(DataDbContext context)
        {
            _context = context;
        }

        // GET: api/EmpleadoProyecto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmpleadoProyectoModel>>> GetEmpleadosProyectos()
        {
            return await _context.EmpleadosProyectos.ToListAsync();
        }

        // GET: api/EmpleadoProyecto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmpleadoProyectoModel>> GetEmpleadoProyectoModel(int id)
        {
            var empleadoProyectoModel = await _context.EmpleadosProyectos.FindAsync(id);

            if (empleadoProyectoModel == null)
            {
                return NotFound();
            }

            return empleadoProyectoModel;
        }

        // PUT: api/EmpleadoProyecto/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmpleadoProyectoModel(int id, EmpleadoProyectoModel empleadoProyectoModel)
        {
            if (id != empleadoProyectoModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(empleadoProyectoModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpleadoProyectoModelExists(id))
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

        // POST: api/EmpleadoProyecto
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EmpleadoProyectoModel>> PostEmpleadoProyectoModel(EmpleadoProyectoModel empleadoProyectoModel)
        {
            _context.EmpleadosProyectos.Add(empleadoProyectoModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmpleadoProyectoModel", new { id = empleadoProyectoModel.Id }, empleadoProyectoModel);
        }

        // DELETE: api/EmpleadoProyecto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmpleadoProyectoModel(int id)
        {
            var empleadoProyectoModel = await _context.EmpleadosProyectos.FindAsync(id);
            if (empleadoProyectoModel == null)
            {
                return NotFound();
            }

            _context.EmpleadosProyectos.Remove(empleadoProyectoModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmpleadoProyectoModelExists(int id)
        {
            return _context.EmpleadosProyectos.Any(e => e.Id == id);
        }
    }
}
