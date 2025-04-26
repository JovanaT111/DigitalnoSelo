using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class newmodels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Sela",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CountryId",
                table: "Sela",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Lat",
                table: "Sela",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Lng",
                table: "Sela",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lat = table.Column<double>(type: "float", nullable: false),
                    Lng = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CountriesId = table.Column<int>(type: "int", nullable: false),
                    Lat = table.Column<double>(type: "float", nullable: false),
                    Lng = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cities_Countries_CountriesId",
                        column: x => x.CountriesId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sela_CityId",
                table: "Sela",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Sela_CountryId",
                table: "Sela",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_CountriesId",
                table: "Cities",
                column: "CountriesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sela_Cities_CityId",
                table: "Sela",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Sela_Countries_CountryId",
                table: "Sela",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sela_Cities_CityId",
                table: "Sela");

            migrationBuilder.DropForeignKey(
                name: "FK_Sela_Countries_CountryId",
                table: "Sela");

            migrationBuilder.DropTable(
                name: "Cities");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropIndex(
                name: "IX_Sela_CityId",
                table: "Sela");

            migrationBuilder.DropIndex(
                name: "IX_Sela_CountryId",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "Lng",
                table: "Sela");
        }
    }
}
