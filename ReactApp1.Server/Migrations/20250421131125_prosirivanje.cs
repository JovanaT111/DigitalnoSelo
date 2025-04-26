using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class prosirivanje : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Lokacija",
                table: "Sela",
                newName: "TipRuralnogPodrucja");

            migrationBuilder.RenameColumn(
                name: "Drzava",
                table: "Sela",
                newName: "StepenRazvijenosti");

            migrationBuilder.AddColumn<int>(
                name: "BrojStanovnika",
                table: "Sela",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "DodatneInformacije",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EkonomskaVitalnost",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FAOProgrami",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "JavniPrevoz",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OgranicenjaUrazvoju",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OsnovneUsluge",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PostojecaAplikacija",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PotencijalAgroturizma",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PotencijalniUcesnici",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Povrsina",
                table: "Sela",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "ResursiIKapaciteti",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SpecijalizacijaPoljoprivrednogSektora",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Datum",
                table: "Novosti",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "SeloImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsLogo = table.Column<bool>(type: "bit", nullable: false),
                    SeloId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeloImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SeloImages_Sela_SeloId",
                        column: x => x.SeloId,
                        principalTable: "Sela",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SeloImages_SeloId",
                table: "SeloImages",
                column: "SeloId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SeloImages");

            migrationBuilder.DropColumn(
                name: "BrojStanovnika",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "DodatneInformacije",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "EkonomskaVitalnost",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "FAOProgrami",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "JavniPrevoz",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "OgranicenjaUrazvoju",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "OsnovneUsluge",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "PostojecaAplikacija",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "PotencijalAgroturizma",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "PotencijalniUcesnici",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "Povrsina",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "ResursiIKapaciteti",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "SpecijalizacijaPoljoprivrednogSektora",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "Datum",
                table: "Novosti");

            migrationBuilder.RenameColumn(
                name: "TipRuralnogPodrucja",
                table: "Sela",
                newName: "Lokacija");

            migrationBuilder.RenameColumn(
                name: "StepenRazvijenosti",
                table: "Sela",
                newName: "Drzava");
        }
    }
}
