using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;
using ReactApp1.Server.Models.ReactApp1.Server.Models;
using System.Reflection.Emit;

namespace ReactApp1.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Selo> Sela { get; set; }
        public DbSet<Novost> Novosti { get; set; }
        public DbSet<Countries> Countries { get; set; }
        public DbSet<Cities> Cities { get; set; }
        public DbSet<SeloImages> SeloImages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Novost>()
                        .HasOne(n => n.Selo)
                        .WithMany(s => s.Novosti)
                        .HasForeignKey(n => n.SeloId);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
