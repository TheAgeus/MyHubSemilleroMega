using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MovieHubApi.Models;
using MovieHubApi.DTOs;
using Microsoft.AspNetCore.Authorization;
using MovieHubApi.Context;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserDto userDto)
    {
        if (await _context.Users.AnyAsync(u => u.username_u == userDto.Username || u.mail_u == userDto.Mail))
        {
            return Conflict(new { error = "El usuario o correo ya están registrados" });
        }

        var user = new User
        {
            username_u = userDto.Username,
            mail_u = userDto.Mail,
            color_u = "#FFFFFF",
            password_u = BCrypt.Net.BCrypt.HashPassword(userDto.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return StatusCode(201, new { message = "Usuario registrado exitosamente" });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginDto loginDto)
    {
        // Fetch the user from the database based on the provided username
        var user = await _context.Users.SingleOrDefaultAsync(u => u.username_u == loginDto.Username);

        // Check if the user exists and the password is correct
        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.password_u))
        {
            return Unauthorized(new { error = "Usuario o contraseña incorrectos" });
        }

        // Create a JWT token
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]); // Make sure to configure this in appsettings.json

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.id.ToString())
        }),
            Expires = DateTime.UtcNow.AddDays(1), // Token expiration duration
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return Ok(new { token = tokenString });
    }
}
