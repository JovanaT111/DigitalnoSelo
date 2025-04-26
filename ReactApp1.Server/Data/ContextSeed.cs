using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Data
{
    public static class ContextSeed
    {
        public static async Task SeedRolesAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            // Seed Roles
            await roleManager.CreateAsync(new IdentityRole(Enums.Roles.Admin.ToString()));
            await roleManager.CreateAsync(new IdentityRole(Enums.Roles.Basic.ToString()));
        }

        public static async Task SeedAdminAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            // Seed Default User
            var defaultUser = new ApplicationUser
            {
                UserName = "digitalno_selo@getnada.com",
                Email = "digitalno_selo@getnada.com",
                FirstName = "Digitalno",
                LastName = "Selo"
            };

            if (userManager.Users.All(u => u.Id != defaultUser.Id))
            {
                var user = await userManager.FindByEmailAsync(defaultUser.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(defaultUser, "Test123+");
                    await userManager.AddToRoleAsync(defaultUser, Enums.Roles.Basic.ToString());
                    await userManager.AddToRoleAsync(defaultUser, Enums.Roles.Admin.ToString());
                }
            }
        }

        public static async Task SeedCountriesAndCitiesAsync(ApplicationDbContext context)
        {
            if (!context.Countries.Any())
            {
                var countries = new List<Countries>
                {
                    new Countries
                    {
                        Name = "Bosna i Hercegovina",
                        Lat = 43.8486,
                        Lng = 18.3564,
                        Cities = new List<Cities>
                        {
                            new Cities { Name = "Sarajevo", Lat = 43.8486, Lng = 18.3564 },
                            new Cities { Name = "Banja Luka", Lat = 44.7719, Lng = 17.1877 },
                            new Cities { Name = "Mostar", Lat = 43.3430, Lng = 17.8050 }
                        }
                    },
                    new Countries
                    {
                        Name = "Srbija",
                        Lat = 44.0165,
                        Lng = 21.0059,
                        Cities = new List<Cities>
                        {
                            new Cities { Name = "Beograd", Lat = 44.8176, Lng = 20.4633 },
                            new Cities { Name = "Novi Sad", Lat = 45.2671, Lng = 19.8335 },
                            new Cities { Name = "Niš", Lat = 43.3216, Lng = 21.8954 }
                        }
                    },
                    new Countries
                    {
                        Name = "Crna Gora",
                        Lat = 42.7087,
                        Lng = 19.3744,
                        Cities = new List<Cities>
                        {
                            new Cities { Name = "Podgorica", Lat = 42.4411, Lng = 19.2636 },
                            new Cities { Name = "Nikšić", Lat = 42.7796, Lng = 18.9589 },
                            new Cities { Name = "Herceg Novi", Lat = 42.4544, Lng = 18.5383 }
                        }
                    },
                    new Countries
                    {
                        Name = "Hrvatska",  
                        Lat = 45.1,         
                        Lng = 15.2,         
                        Cities = new List<Cities>
                        {
                            new Cities { Name = "Zagreb", Lat = 45.8131, Lng = 15.978 },  
                            new Cities { Name = "Split", Lat = 43.5081, Lng = 16.4402 },    
                            new Cities { Name = "Rijeka", Lat = 45.3271, Lng = 14.4422 },   
                            new Cities { Name = "Osijek", Lat = 45.5517, Lng = 18.6932 },   
                            new Cities { Name = "Zadar", Lat = 44.1194, Lng = 15.2314 }    
                        }
                    }
                };

                await context.Countries.AddRangeAsync(countries);
                await context.SaveChangesAsync();
            }
        }
    }
}
