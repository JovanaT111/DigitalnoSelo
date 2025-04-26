// Controllers/SeloController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;
using ReactApp1.Server.Models.ReactApp1.Server.Models;

[Route("api/[controller]")]
[ApiController]
public class SeloController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SeloController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Selo
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Selo>>> GetSela()
    {
        return await _context.Sela.ToListAsync();
    }

    // GET: api/Selo/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Selo>> GetSelo(int id)
    {
        var selo = await _context.Sela.FindAsync(id);

        if (selo == null)
        {
            return NotFound();
        }

        return selo;
    }

    // POST: api/Selo
    [HttpPost]
    public async Task<ActionResult<Selo>> PostSelo(Selo selo)
    {
        _context.Sela.Add(selo);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSelo), new { id = selo.Id }, selo);
    }

    // PUT: api/Selo/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutSelo(int id, Selo selo)
    {
        if (id != selo.Id)
        {
            return BadRequest();
        }

        _context.Entry(selo).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Selo/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSelo(int id)
    {
        var selo = await _context.Sela.FindAsync(id);
        if (selo == null)
        {
            return NotFound();
        }

        _context.Sela.Remove(selo);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // GET: api/Selo/countries
    [HttpGet("countries")]
    public async Task<ActionResult<IEnumerable<Countries>>> GetCountries()
    {
        return await _context.Countries.ToListAsync();
    }

    // GET: api/Selo/countries
    [HttpGet("cities")]
    public async Task<ActionResult<IEnumerable<Cities>>> GetCities()
    {
        return await _context.Cities.ToListAsync();
    }

    // GET: api/Selo/countries/{id}/cities
    [HttpGet("countries/{id}/cities")]
    public async Task<ActionResult<IEnumerable<Cities>>> GetCitiesByCountry(int id)
    {
        var country = await _context.Countries.Include(c => c.Cities)
                                               .FirstOrDefaultAsync(c => c.Id == id);

        if (country == null)
        {
            return NotFound();
        }

        return country.Cities.ToList();
    }

    [HttpGet("coordinates")]
    public async Task<ActionResult<IEnumerable<SeloMapVM>>> GetSeloCoordinates()
    {
        return await _context.Sela
            .Where(s => s.Lat != null && s.Lng != null) 
            .Select(s => new SeloMapVM
            {
                Id = s.Id,
                Naziv = s.Naziv,
                Latitude = s.Lat,  
                Longitude = s.Lng
            })
            .ToListAsync();
    }

    [HttpPost("selo/{seloId}/uploadLogo")]
    public async Task<IActionResult> UploadLogo(IFormFile file, int seloId)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        var filePath = Path.Combine("wwwroot/uploads/logo", file.FileName);

        // Save the file
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var seloImage = new SeloImages
        {
            Path = filePath,
            IsLogo = true,
            IsFile = false,
            SeloId = seloId
        };

        _context.SeloImages.Add(seloImage);
        await _context.SaveChangesAsync();

        return Ok(new { FilePath = filePath });
    }

    [HttpPost("selo/{seloId}/uploadPhotos")]
    public async Task<IActionResult> UploadPhotos(List<IFormFile> files, int seloId)
    {
        if (files == null || files.Count == 0)
            return BadRequest("No files uploaded.");

        var filePaths = new List<string>();
        foreach (var file in files)
        {
            var filePath = Path.Combine("wwwroot/uploads/photos", file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            filePaths.Add(filePath);

            var seloImage = new SeloImages
            {
                Path = filePath,
                SeloId = seloId,
                IsLogo = false,
                IsFile = false
            };

            _context.SeloImages.Add(seloImage);
        }

        await _context.SaveChangesAsync();


        return Ok(new { FilePaths = filePaths });
    }

    [HttpPost("selo/{seloId}/uploadDocuments")]
    public async Task<IActionResult> UploadDocuments(List<IFormFile> files, int seloId)
    {
        if (files == null || files.Count == 0)
            return BadRequest("No files uploaded.");

        var filePaths = new List<string>();
        foreach (var file in files)
        {
            var filePath = Path.Combine("wwwroot/uploads/documents", file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            filePaths.Add(filePath);

            var seloImage = new SeloImages
            {
                Path = filePath,
                SeloId = seloId,
                IsLogo = false,
                IsFile = true
            };

            _context.SeloImages.Add(seloImage);
        }

        await _context.SaveChangesAsync();


        return Ok(new { FilePaths = filePaths });
    }

    // GET: api/Selo/{seloId}/images
    [HttpGet("{seloId}/images")]
    public async Task<ActionResult<IEnumerable<SeloImages>>> GetImagesBySeloId(int seloId)
    {
        var images = await _context.SeloImages
            .Where(si => si.SeloId == seloId)
            .ToListAsync();

        if (images == null || images.Count == 0)
        {
            return NotFound($"No images found for SeloId {seloId}");
        }

        return Ok(images);
    }

}
