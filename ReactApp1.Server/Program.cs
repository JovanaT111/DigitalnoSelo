
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ReactApp1.Server
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration.GetConnectionString("ApplicationDbContextConnection") ?? throw new InvalidOperationException("Connection string 'ApplicationDbContextConnection' not found.");

            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

            builder.Services.AddAuthorization();
            builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSingleton<EmailService>();

            builder.Services.AddControllers();

            // Add CORS to services
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder => builder
                        .WithOrigins("https://localhost:5173") // Allow your frontend to make requests
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .SetPreflightMaxAge(TimeSpan.FromMinutes(10)));
            });


            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                db.Database.Migrate();

                var services = scope.ServiceProvider;

                var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
                var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

                await  ContextSeed.SeedRolesAsync(userManager, roleManager);
                await  ContextSeed.SeedAdminAsync(userManager, roleManager);
                await ContextSeed.SeedCountriesAndCitiesAsync(db);
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.MapIdentityApi<ApplicationUser>();

            app.MapPost("/logout", async (SignInManager<ApplicationUser> signInManager) =>
            {

                await signInManager.SignOutAsync();
                return Results.Ok();

            }).RequireAuthorization();


            app.MapGet("/pingauth", (ClaimsPrincipal user) =>
            {
                var email = user.FindFirstValue(ClaimTypes.Email); // get the user's email from the claim
                return Results.Json(new { Email = email }); ; // return the email as a plain text response
            }).RequireAuthorization();


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors("AllowReactApp");

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
