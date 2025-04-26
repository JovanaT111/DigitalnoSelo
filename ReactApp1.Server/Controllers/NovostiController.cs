using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NovostiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NovostiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Novost>>> GetAllNews()
        {
            var novosti = await _context.Novosti.ToListAsync();
            return Ok(novosti);
        }


        // Dohvati sve novosti za određeno selo
        [HttpGet("{seloId}")]
        public async Task<ActionResult<IEnumerable<Novost>>> GetNovostiBySelo(int seloId)
        {
            var novosti = await _context.Novosti
                .Where(n => n.SeloId == seloId)
                .ToListAsync();

            return Ok(novosti);
        }

        [HttpPost("{seloId}")]
        public async Task<ActionResult<Novost>> CreateNovost(int seloId, [FromForm] NovostCreateRequest request)
        {
            if (request.Novost == null)
            {
                return BadRequest("Podaci o novosti nisu ispravni.");
            }

            var novost = request.Novost;

            if (request.Slika != null)
            {
                var slikaPath = Path.Combine("wwwroot/uploads", request.Slika.FileName);
                using (var stream = new FileStream(slikaPath, FileMode.Create))
                {
                    await request.Slika.CopyToAsync(stream);
                }
                novost.SlikaUrl = "/uploads/" + request.Slika.FileName;
            }

            if (request.Dokument != null)
            {
                var dokumentPath = Path.Combine("wwwroot/uploads", request.Dokument.FileName);
                using (var stream = new FileStream(dokumentPath, FileMode.Create))
                {
                    await request.Dokument.CopyToAsync(stream);
                }
                novost.DokumentUrl = "/uploads/" + request.Dokument.FileName;
            }

            novost.SeloId = seloId;

            _context.Novosti.Add(novost);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNovostiBySelo), new { seloId = seloId }, novost);
        }


        // Ažuriraj novost
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNovost(int id, [FromBody] Novost novost)
        {
            if (id != novost.Id)
            {
                return BadRequest();
            }

            _context.Entry(novost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Novosti.Any(n => n.Id == id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpGet("single/{id}")]
        public async Task<ActionResult<Novost>> GetNovostById(int id)
        {
            var novost = await _context.Novosti.FindAsync(id);

            if (novost == null)
            {
                return NotFound();
            }

            return Ok(novost);
        }
    }
}
