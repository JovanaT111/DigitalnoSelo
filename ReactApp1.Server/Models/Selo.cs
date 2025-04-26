namespace ReactApp1.Server.Models
{
    namespace ReactApp1.Server.Models
    {
        public class Selo
        {
            public int Id { get; set; } 

            public string Naziv { get; set; }

            public string OvlasceniKorisnik { get; set; } 

            public double? Lat { get; set; } 

            public double? Lng { get; set; } 

            public List<Novost> Novosti { get; set; } = new List<Novost>(); 

            public Nullable<int> CountryId { get; set; } 
            public Countries? Country { get; set; } 

            public Nullable<int> CityId { get; set; } 
            public Cities? City { get; set; } 

            public double? Povrsina { get; set; } 

            public int? BrojStanovnika { get; set; }

            public string? TipRuralnogPodrucja { get; set; } 

            public string? SpecijalizacijaPoljoprivrednogSektora { get; set; } 

            public string? PotencijalAgroturizma { get; set; } 

            public string? OsnovneUsluge { get; set; } 

            public string? FAOProgrami { get; set; }

            public string? PotencijalniUcesnici { get; set; } 

            public string? PostojecaAplikacija { get; set; } 

            public string? StepenRazvijenosti { get; set; }

            public string? Zaostajanje { get; set; }

            public string? RazvojNapredovanje { get; set; }

            public string? DodatneInformacije { get; set; }

            public string? Prosperitet { get; set; }

            public string? JavniPrevoz { get; set; } 

            public string? ResursiIKapaciteti { get; set; } 

            public string? EkonomskaVitalnost { get; set; }

            public string? OgranicenjaUrazvoju { get; set; }
            public string? FacebookLink { get; set; }
            public string? InstagramLink { get; set; }

            public List<SeloImages> SeloImages { get; set; } = new List<SeloImages>();
        }
    }

}
