using ReactApp1.Server.Models.ReactApp1.Server.Models;

namespace ReactApp1.Server.Models
{
    public class SeloImages
    {
        public int Id { get; set; }
        public String Path { get; set; }
        public bool IsLogo { get; set; }
        public bool IsFile { get; set; }
        public int SeloId { get; set; }
        public Selo Selo { get; set; }
    }
}
