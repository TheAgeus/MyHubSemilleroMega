using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieHubApi.Context;
using MovieHubApi.Models;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
public class MoviesController : ControllerBase
{
    private readonly AppDbContext _context;

    public MoviesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/movie/categories
    [AllowAnonymous]
    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        try
        {
            var categories = await _context.Movies
                .Select(m => m.category_m)
                .Distinct()
                .ToListAsync();

            return Ok(categories);
        }
        catch
        {
            return StatusCode(500, "Error al obtener categorías de películas");
        }
    }


    

    // Get a certain movie by ID
    [AllowAnonymous]
    [HttpGet("movies/{id}")]
    public async Task<IActionResult> GetMovie(int id)
    {
        var movie = await _context.Movies.FindAsync(id);

        if (movie == null)
            return NotFound(new { error = "No encontrado" });

        return Ok(movie);
    }

    
}
