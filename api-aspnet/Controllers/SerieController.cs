using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieHubApi.Context;
using MovieHubApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MovieHubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SeriesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/series/categories
        [AllowAnonymous]
        [HttpGet("categories")]
        public async Task<IActionResult> GetSeriesCategories()
        {
            try
            {
                var categories = await _context.Series
                    .Select(s => s.category_s)
                    .Distinct()
                    .ToListAsync();

                return Ok(categories);
            }
            catch
            {
                return StatusCode(500, "Error al obtener categorías de series");
            }
        }

        

        // Get a certain series by ID
        [AllowAnonymous]
        [HttpGet("series/{id}")]
        public async Task<IActionResult> GetSerie(int id)
        {
            var serie = await _context.Series.FindAsync(id);

            if (serie == null)
                return NotFound(new { error = "No encontrado" });

            return Ok(serie);
        }

        [AllowAnonymous]
        [HttpGet("series/{serieId}/chapters")]
        public async Task<IActionResult> GetChaptersBySerieId(int serieId)
        {
            try
            {
                var chapters = await _context.Chapters
                    .Where(c => c.serie_id == serieId)
                    .Select(c => new
                    {
                        c.season_number_c,
                        c.title_c,
                        c.description_c,
                        c.serie_id
                    })
                    .ToListAsync();

                if (chapters == null || !chapters.Any())
                {
                    return NotFound($"No chapters found for series ID {serieId}");
                }

                return Ok(chapters);
            }
            catch (Exception ex)
            {
                // Log the exception if necessary
                return StatusCode(500, "Error retrieving chapters: " + ex.Message);
            }
        }
    }
}
