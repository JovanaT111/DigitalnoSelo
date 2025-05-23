using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ReactApp1.Server.Data;
using ReactApp1.Server.Services;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;

        public UserManagerController(UserManager<ApplicationUser> userManager, ApplicationDbContext context, IConfiguration configuration, IEmailService emailService)
        {
            _userManager = userManager;
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("by-email")]
        public async Task<IActionResult> GetUserByEmail([FromQuery] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Email parameter is required.");
            }

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] ApplicationUser newUser)
        {
            if (newUser == null)
                return BadRequest("User data is invalid.");

            var pass = "Test123!";  // Default password

            // Hash the password using PasswordHasher
            var passwordHasher = new PasswordHasher<ApplicationUser>();
            var hashedPassword = passwordHasher.HashPassword(newUser, pass);


            var user = new ApplicationUser
            {
                UserName = newUser.Email,
                Email = newUser.Email,
                NormalizedUserName = newUser.Email.ToUpper(),
                NormalizedEmail = newUser.Email.ToUpper(),
                PasswordHash = hashedPassword,
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                //Villages = newUser.Villages
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Send email to created user
            await SendWelcomeEmail(user.Email, pass);

            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] ApplicationUser updatedUser)
        {
            if (id != updatedUser.Id)
            {
                return BadRequest("User ID mismatch.");
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;

            if (user.Email != updatedUser.Email)
            {
                var setEmailResult = await _userManager.SetEmailAsync(user, updatedUser.Email);
                var setUserNameResult = await _userManager.SetUserNameAsync(user, updatedUser.Email);
                if (!setEmailResult.Succeeded || !setUserNameResult.Succeeded)
                {
                    var errors = setEmailResult.Errors.Concat(setUserNameResult.Errors);
                    return BadRequest($"Email update failed: {string.Join(", ", errors.Select(e => e.Description))}");
                }
            }

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok(user);
            }
            else
            {
                return BadRequest($"Update failed: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }
        }

        // POST: api/users/forgot-password
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("Email is required.");
            }

            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var resetLink = $"{_configuration["AppSettings:BaseUrl"]}/reset-password?token={Uri.EscapeDataString(token)}&email={Uri.EscapeDataString(request.Email)}";

            var subject = "Password Reset Request";
            var body = $"To reset your password, click the following link: {resetLink}";

            await _emailService.SendEmailAsync(request.Email, subject, body);

            return Ok("Password reset link has been sent to your email.");
        }

        // POST: api/users/reset-password
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.ResetCode) || string.IsNullOrEmpty(request.NewPassword))
            {
                return BadRequest("Email, reset code, and new password are required.");
            }

            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var result = await _userManager.ResetPasswordAsync(user, request.ResetCode, request.NewPassword);

            if (result.Succeeded)
            {
                return Ok("Password has been successfully reset.");
            }
            else
            {
                return BadRequest($"Error: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }
        }

        private async Task SendWelcomeEmail(string email, string password)
        {
            var subject = "Dobrodošli!";
            var body = $"Zdravo, \n\nDobrodošli! Tvoj korisnički račun je uspješno kreiran. Tvoji podaci za logovanje:\n\nEmail: {email}\nLozinika: {password}\n\nPozdrav,\nDigitalno Selo";

            await _emailService.SendEmailAsync(email, subject, body);
        }
    }
}