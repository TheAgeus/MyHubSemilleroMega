using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieHubApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name_m = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description_m = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    category_m = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    img_url = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Series",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name_s = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description_s = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    category_s = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    img_url = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Series", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username_u = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    mail_u = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password_u = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    color_u = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Chapters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    season_number_c = table.Column<int>(type: "int", nullable: false),
                    title_c = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description_c = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    serie_id = table.Column<int>(type: "int", nullable: false),
                    Serieid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chapters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Chapters_Series_Serieid",
                        column: x => x.Serieid,
                        principalTable: "Series",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "UsersAreWatchingMovies",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    MovieId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersAreWatchingMovies", x => new { x.UserId, x.MovieId });
                    table.ForeignKey(
                        name: "FK_UsersAreWatchingMovies_Movies_MovieId",
                        column: x => x.MovieId,
                        principalTable: "Movies",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersAreWatchingMovies_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsersAreWatchingSeries",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    SerieId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersAreWatchingSeries", x => new { x.UserId, x.SerieId });
                    table.ForeignKey(
                        name: "FK_UsersAreWatchingSeries_Series_SerieId",
                        column: x => x.SerieId,
                        principalTable: "Series",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersAreWatchingSeries_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsersHasFavoriteSeries",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    SerieId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersHasFavoriteSeries", x => new { x.UserId, x.SerieId });
                    table.ForeignKey(
                        name: "FK_UsersHasFavoriteSeries_Series_SerieId",
                        column: x => x.SerieId,
                        principalTable: "Series",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersHasFavoriteSeries_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsersHaveFavoriteMovies",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    MovieId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersHaveFavoriteMovies", x => new { x.UserId, x.MovieId });
                    table.ForeignKey(
                        name: "FK_UsersHaveFavoriteMovies_Movies_MovieId",
                        column: x => x.MovieId,
                        principalTable: "Movies",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersHaveFavoriteMovies_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Chapters_Serieid",
                table: "Chapters",
                column: "Serieid");

            migrationBuilder.CreateIndex(
                name: "IX_UsersAreWatchingMovies_MovieId",
                table: "UsersAreWatchingMovies",
                column: "MovieId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersAreWatchingSeries_SerieId",
                table: "UsersAreWatchingSeries",
                column: "SerieId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersHasFavoriteSeries_SerieId",
                table: "UsersHasFavoriteSeries",
                column: "SerieId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersHaveFavoriteMovies_MovieId",
                table: "UsersHaveFavoriteMovies",
                column: "MovieId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Chapters");

            migrationBuilder.DropTable(
                name: "UsersAreWatchingMovies");

            migrationBuilder.DropTable(
                name: "UsersAreWatchingSeries");

            migrationBuilder.DropTable(
                name: "UsersHasFavoriteSeries");

            migrationBuilder.DropTable(
                name: "UsersHaveFavoriteMovies");

            migrationBuilder.DropTable(
                name: "Series");

            migrationBuilder.DropTable(
                name: "Movies");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
