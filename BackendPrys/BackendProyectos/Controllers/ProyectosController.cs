using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendProyectos.Data;
using BackendProyectos.Models.Entidades;

namespace BackendProyectos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProyectosController : ControllerBase
    {
        private readonly DataDbContext _context;

        public ProyectosController(DataDbContext context)
        {
            _context = context;
        }

        // GET: api/Proyectos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProyectosModel>>> GetProyectos()
        {
            return await _context.Proyectos.ToListAsync();
        }

        // GET: api/Proyectos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProyectosModel>> GetProyectosModel(int id)
        {
            var proyectosModel = await _context.Proyectos.FindAsync(id);

            if (proyectosModel == null)
            {
                return NotFound();
            }

            return proyectosModel;
        }

        // PUT: api/Proyectos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProyectosModel(int id, ProyectosModel proyectosModel)
        {
            if (id != proyectosModel.Id)
            {
                return BadRequest();
            }
            proyectosModel.Update_At = DateTime.Now;
            _context.Entry(proyectosModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProyectosModelExists(id))
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

        // POST: api/Proyectos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProyectosModel>> PostProyectosModel(ProyectosModel proyectosModel)
        {
            proyectosModel.Create_At = DateTime.Now;
            proyectosModel.Update_At = DateTime.Now;
            _context.Proyectos.Add(proyectosModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProyectosModel", new { id = proyectosModel.Id }, proyectosModel);
        }

        // DELETE: api/Proyectos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProyectosModel(int id)
        {
            var proyectosModel = await _context.Proyectos.FindAsync(id);
            if (proyectosModel == null)
            {
                return NotFound();
            }

            _context.Proyectos.Remove(proyectosModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProyectosModelExists(int id)
        {
            return _context.Proyectos.Any(e => e.Id == id);
        }
    }
}
