using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MovieHubApi.Context;
using MovieHubApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public UserController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // MOVIES STUFF

    // Get all movies with a certain category
    [HttpGet("get_by_category/movies/{category}")]
    public async Task<IActionResult> GetMoviesByCategory(string category)
    {
        try
        {
            // Retrieve the user ID from claims
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int userId = string.IsNullOrEmpty(userIdString) ? 0 : int.Parse(userIdString);

            var movies = await _context.Movies
                .Where(m => m.category_m == category)
                .Select(m => new
                {
                    movie_id = m.id,
                    movie_name = m.name_m,
                    movie_description = m.description_m,
                    movie_category = m.category_m,
                    movie_img_url = m.img_url,
                    es_favorito = _context.UsersHaveFavoriteMovies
                        .Any(uhf => uhf.MovieId == m.id && uhf.UserId == userId) ? "Sí" : "No",
                    es_viendo = _context.UsersAreWatchingMovies
                        .Any(uhf => uhf.MovieId == m.id && uhf.UserId == userId) ? "Sí" : "No"
                })
                .ToListAsync();

            return Ok(movies);
        }
        catch
        {
            return StatusCode(500, "Error al obtener películas");
        }
    }
    // Get all series with a certain category
    [HttpGet("get_by_category/series/{category}")]
    public async Task<IActionResult> GetSeriesByCategory(string category)
    {
        try
        {
            // Retrieve the user ID from claims
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int userId = string.IsNullOrEmpty(userIdString) ? 0 : int.Parse(userIdString);

            var movies = await _context.Series
                .Where(m => m.category_s == category)
                .Select(m => new
                {
                    serie_id = m.id,
                    serie_name = m.name_s,
                    serie_description = m.description_s,
                    serie_category = m.category_s,
                    serie_img_url = m.img_url,
                    es_favorito = _context.UsersHasFavoriteSeries
                        .Any(uhf => uhf.SerieId == m.id && uhf.UserId == userId) ? "Sí" : "No",
                    es_viendo = _context.UsersAreWatchingSeries
                        .Any(uhf => uhf.SerieId == m.id && uhf.UserId == userId) ? "Sí" : "No"
                })
                .ToListAsync();

            return Ok(movies);
        }
        catch
        {
            return StatusCode(500, "Error al obtener series");
        }
    }

    // Get all series
    [HttpGet("movies")]
    public async Task<IActionResult> GetMovies()
    {
        

        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            // fetch
            var series = await _context.Movies
            .Select(s => new
            {
                movie_id = s.id,
                movie_name = s.name_m,
                movie_description = s.description_m,
                movie_category = s.category_m,
                movie_img_url = s.img_url,
                es_favorito = _context.UsersHaveFavoriteMovies
                    .Any(uhs => uhs.MovieId == s.id && uhs.UserId == Int32.Parse(userId)) ? "Sí" : "No",
                es_viendo = _context.UsersAreWatchingMovies
                    .Any(uhs => uhs.MovieId == s.id && uhs.UserId == Int32.Parse(userId)) ? "Sí" : "No",
            })
            .ToListAsync();

            return Ok(series);
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }

    // Set a favorite movie for a user
    [HttpGet("user_like_movie/{movie_id}")]
    public async Task<IActionResult> LikeMovie(int movie_id)
    {
        
        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

           
            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            //fetch
            var favoriteMovie = new Users_have_favorite_movies
            {
                UserId = Int32.Parse(userId),
                MovieId = movie_id
            };

            _context.UsersHaveFavoriteMovies.Add(favoriteMovie);

            await _context.SaveChangesAsync();

            return StatusCode(201, new { message = "Favorito agregado" });
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }

    // Set that a user is watching a movie
    [HttpGet("user_watch_movie/{movie_id}")]
    public async Task<IActionResult> WatchMovie(int movie_id)
    {
        

        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            // Fetch the user details from the database
            var watchingMovie = new Users_are_watching_movies
            {
                UserId = Int32.Parse(userId),
                MovieId = movie_id
            };

            _context.UsersAreWatchingMovies.Add(watchingMovie);

            await _context.SaveChangesAsync();

            return StatusCode(201, new { message = "Viendo película agregado" });
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }

    // Get user's favorite movies
    [HttpGet("favorite_movies")]
    public async Task<IActionResult> GetFavoriteMovies()
    {
       

        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            // Fetch the user details from the database
            var favoriteMovies = await _context.UsersHaveFavoriteMovies
            .Where(uhm => uhm.UserId == Int32.Parse(userId))
            .Select(uhm => new
            {
                movie_id = uhm.Movie.id,
                movie_name = uhm.Movie.name_m,
                movie_description = uhm.Movie.description_m,
                movie_category = uhm.Movie.category_m,
                movie_img_url = uhm.Movie.img_url,
                es_favorito = _context.UsersHaveFavoriteMovies
                    .Any(uhs => uhs.MovieId == uhm.Movie.id && uhs.UserId == Int32.Parse(userId)) ? "Sí" : "No",
                es_viendo = _context.UsersAreWatchingMovies
                    .Any(uawm => uawm.MovieId == uhm.Movie.id && uawm.UserId == Int32.Parse(userId)) ? "Sí" : "No",
            })
            .ToListAsync();

            return Ok(favoriteMovies);
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }

    // Get user's watching movies
    [HttpGet("watching_movies")]
    public async Task<IActionResult> GetWatchingMovies()
    {
        

        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            // Fetch the user details from the database
            var watchingMovies = await _context.UsersAreWatchingMovies
            .Where(uawm => uawm.UserId == Int32.Parse(userId))
            .Select(uawm => new
            {
                movie_id = uawm.Movie.id,
                movie_name = uawm.Movie.name_m,
                movie_description = uawm.Movie.description_m,
                movie_category = uawm.Movie.category_m,
                movie_img_url = uawm.Movie.img_url,
                es_favorito = _context.UsersHaveFavoriteMovies
                    .Any(uhm => uhm.MovieId == uawm.Movie.id && uhm.UserId == Int32.Parse(userId)) ? "Sí" : "No",
                es_viendo = _context.UsersAreWatchingMovies
                    .Any(uwm => uwm.MovieId == uawm.Movie.id && uwm.UserId == Int32.Parse(userId)) ? "Sí" : "No",
            })
            .ToListAsync();

            return Ok(watchingMovies);
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }

    // Erase a favorite movie
    [HttpDelete("eraseFavMovie/{id}")]
    public async Task<IActionResult> EraseFavoriteMovie(int id)
    {

        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            // Fetch the user details from the database
            var favoriteMovie = await _context.UsersHaveFavoriteMovies
            .Where(uhm => uhm.UserId == Int32.Parse(userId) && uhm.MovieId == id)
            .FirstOrDefaultAsync();

            if (favoriteMovie == null)
                return NotFound(new { error = "No encontrado" });

            _context.UsersHaveFavoriteMovies.Remove(favoriteMovie);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Favorito borrado" });
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }

    // Erase a favorite movie
    [HttpDelete("eraseWatchMovie/{id}")]
    public async Task<IActionResult> EraseWatchMovie(int id)
    {

        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            // Fetch the user details from the database
            var favoriteMovie = await _context.UsersAreWatchingMovies
            .Where(uhm => uhm.UserId == Int32.Parse(userId) && uhm.MovieId == id)
            .FirstOrDefaultAsync();

            if (favoriteMovie == null)
                return NotFound(new { error = "No encontrado" });

            _context.UsersAreWatchingMovies.Remove(favoriteMovie);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Viendo borrado" });
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }


    // SERIES STUFF
    // Get all series
    [HttpGet("series")]
    public async Task<IActionResult> GetSeries()
    {
        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            // Fetch the user details from the database
            var series = await _context.Series
            .Select(s => new
            {
                serie_id = s.id,
                serie_name = s.name_s,
                serie_description = s.description_s,
                serie_category = s.category_s,
                serie_img_url = s.img_url,
                es_favorito = _context.UsersHasFavoriteSeries
                    .Any(uhs => uhs.SerieId == s.id && uhs.UserId == Int32.Parse(userId)) ? "Sí" : "No",
                es_viendo = _context.UsersAreWatchingSeries
                    .Any(uhs => uhs.SerieId == s.id && uhs.UserId == Int32.Parse(userId)) ? "Sí" : "No"
            })
            .ToListAsync();

            return Ok(series);
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }

    // Set a favorite series for a user
    [HttpGet("user_like_serie/{serie_id}")]
    public async Task<IActionResult> LikeSerie(int serie_id)
    {
        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            // Fetch the user details from the database

            var favoriteSerie = new Users_has_favorite_series
            {
                UserId = Int32.Parse(userId),
                SerieId = serie_id
            };

            _context.UsersHasFavoriteSeries.Add(favoriteSerie);

            await _context.SaveChangesAsync();

            return StatusCode(201, new { message = "Serie agregada a favoritos" });
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }

    }

    // Set that a user is watching a series
    [HttpGet("user_watch_serie/{serie_id}")]
    public async Task<IActionResult> WatchSerie(int serie_id)
    {
        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            // Fetch the user details from the database
            var watchingSerie = new Users_are_watching_series
            {
                UserId = Int32.Parse(userId),
                SerieId = serie_id
            };

            _context.UsersAreWatchingSeries.Add(watchingSerie);

            await _context.SaveChangesAsync();

            return StatusCode(201, new { message = "Viendo serie agregado" });
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }

    // Get user's favorite series
    [HttpGet("favorite_series")]
    public async Task<IActionResult> GetFavoriteSeries()
    {
        

        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            // Fetch the user details from the database
            var favoriteMovies = await _context.UsersHasFavoriteSeries
            .Where(uhm => uhm.UserId == Int32.Parse(userId))
            .Select(uhm => new
            {
                serie_id = uhm.Serie.id,
                serie_name = uhm.Serie.name_s,
                serie_description = uhm.Serie.description_s,
                serie_category = uhm.Serie.category_s,
                serie_img_url = uhm.Serie.img_url,
                es_favorito = _context.UsersHasFavoriteSeries
                    .Any(uhs => uhs.SerieId == uhm.Serie.id && uhs.UserId == Int32.Parse(userId)) ? "Sí" : "No",
                es_viendo = _context.UsersHasFavoriteSeries
                    .Any(uawm => uawm.SerieId == uhm.Serie.id && uawm.UserId == Int32.Parse(userId)) ? "Sí" : "No",
            })
            .ToListAsync();

            return Ok(favoriteMovies);
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }

    // Erase a watch seria
    [HttpDelete("eraseWatchSerie/{id}")]
    public async Task<IActionResult> EraseWatchSerie(int id)
    {

        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            // Fetch the user details from the database
            var favoriteMovie = await _context.UsersAreWatchingSeries
            .Where(uhm => uhm.UserId == Int32.Parse(userId) && uhm.SerieId == id)
            .FirstOrDefaultAsync();

            if (favoriteMovie == null)
                return NotFound(new { error = "No encontrado" });

            _context.UsersAreWatchingSeries.Remove(favoriteMovie);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Viendo borrado" });
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }

    // Get user's watching series
    [HttpGet("watching_series")]
    public async Task<IActionResult> GetWatchingSeries()
    {
        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            // Fetch the user details from the database
            var watchingSeries = await _context.UsersAreWatchingSeries
            .Where(uaws => uaws.UserId == Int32.Parse(userId))
            .Select(uaws => new
            {
                serie_id = uaws.Serie.id,
                serie_name = uaws.Serie.name_s,
                serie_description = uaws.Serie.description_s,
                serie_category = uaws.Serie.category_s,
                serie_img_url = uaws.Serie.img_url,
                es_favorito = _context.UsersHasFavoriteSeries
                    .Any(uhs => uhs.SerieId == uaws.Serie.id && uhs.UserId == Int32.Parse(userId)) ? "Sí" : "No",
                es_viendo = _context.UsersAreWatchingSeries
                    .Any(uawm => uawm.SerieId == uaws.Serie.id && uawm.UserId == Int32.Parse(userId)) ? "Sí" : "No",
            })
            .ToListAsync();

            return Ok(watchingSeries);


        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }

    // Erase a favorite series
    [HttpDelete("eraseFavSerie/{id}")]
    public async Task<IActionResult> EraseFavoriteSerie(int id)
    {

        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            var favoriteSerie = await _context.UsersHasFavoriteSeries
            .Where(uhs => uhs.UserId == Int32.Parse(userId) && uhs.SerieId == id)
            .FirstOrDefaultAsync();

            if (favoriteSerie == null)
                return NotFound(new { error = "No encontrado" });

            _context.UsersHasFavoriteSeries.Remove(favoriteSerie);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Favorito borrado" });
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }


    [HttpGet("me")]
    public async Task<IActionResult> GetUserProfile()
    {
        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { error = "No autorizado" });

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Validate the token and get claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Adjust if needed
            }, out SecurityToken validatedToken);

            // Extract the user ID from the claims
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { error = "No autorizado" });

            // Fetch the user details from the database
            var user = await _context.Users
                .Where(u => u.id.ToString() == userId)
                .Select(u => new { u.username_u, u.mail_u })
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound(new { error = "Usuario no encontrado" });

            return Ok(user);
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized(new { error = "Token expirado" });
        }
        catch (SecurityTokenInvalidSignatureException)
        {
            return Unauthorized(new { error = "Firma del token inválida" });
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            // _logger.LogError(ex, "Error al procesar el perfil del usuario");
            return StatusCode(500, new { error = "Error interno del servidor" });
        }
    }
}