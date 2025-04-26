using System.Text.Json.Serialization;

namespace ReactApp1.Server.Models
{
    public class Cities
    {
        public int Id { get; set; }
        public String Name { get; set; }

        public int CountriesId { get; set; }

        [JsonIgnore]
        public Countries Country { get; set; }

        public Double Lat { get; set; }
        public Double Lng { get; set; }
    }
}
