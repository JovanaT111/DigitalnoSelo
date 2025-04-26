using ReactApp1.Server.Models.ReactApp1.Server.Models;

namespace ReactApp1.Server.Models
{
    public class Novost
    {
        public int Id { get; set; }
        public string Naslov { get; set; }
        public string Opis { get; set; }
        public DateTime Datum { get; set; }
        public string? SlikaUrl { get; set; } // Putanja do slike
        public string? DokumentUrl { get; set; } // Putanja do dokumenta
        public int SeloId { get; set; } // Veza sa modelom Selo
        public Selo? Selo { get; set; } // Navigacijska svojstva
    }
}
