namespace ReactApp1.Server.Models
{
    public class NovostCreateRequest
    {
        public Novost Novost { get; set; }
        public IFormFile? Slika { get; set; }
        public IFormFile? Dokument { get; set; }
    }
}
