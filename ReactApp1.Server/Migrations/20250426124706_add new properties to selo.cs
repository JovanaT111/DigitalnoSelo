using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class addnewpropertiestoselo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Prosperitet",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RazvojNapredovanje",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Zaostajanje",
                table: "Sela",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Prosperitet",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "RazvojNapredovanje",
                table: "Sela");

            migrationBuilder.DropColumn(
                name: "Zaostajanje",
                table: "Sela");
        }
    }
}
