using Microsoft.AspNetCore.Identity;

namespace ReactApp1.Server.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
