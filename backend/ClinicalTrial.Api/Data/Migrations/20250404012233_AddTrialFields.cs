using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClinicalTrial.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddTrialFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Trials");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Trials",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Trials",
                newName: "Status");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Trials",
                type: "TEXT",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }
    }
}
