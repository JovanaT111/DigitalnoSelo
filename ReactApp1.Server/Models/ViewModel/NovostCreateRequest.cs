namespace ReactApp1.Server.Models.ViewModel
{
    public class NovostCreateRequest
    {
        public Novost Novost { get; set; }
        public IFormFile? Slika { get; set; }
        public IFormFile? Dokument { get; set; }
    }
}
