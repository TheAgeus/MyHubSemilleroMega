using Microsoft.EntityFrameworkCore;
using MovieHubApi.Models;

namespace MovieHubApi.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Serie> Series { get; set; }
        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<Users_have_favorite_movies> UsersHaveFavoriteMovies { get; set; }
        public DbSet<Users_has_favorite_series> UsersHasFavoriteSeries { get; set; }
        public DbSet<Users_are_watching_movies> UsersAreWatchingMovies { get; set; }
        public DbSet<Users_are_watching_series> UsersAreWatchingSeries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the composite keys for the join tables
            modelBuilder.Entity<Users_have_favorite_movies>()
                .HasKey(ufm => new { ufm.UserId, ufm.MovieId });

            modelBuilder.Entity<Users_has_favorite_series>()
                .HasKey(ufs => new { ufs.UserId, ufs.SerieId });

            modelBuilder.Entity<Users_are_watching_movies>()
                .HasKey(uwm => new { uwm.UserId, uwm.MovieId });

            modelBuilder.Entity<Users_are_watching_series>()
                .HasKey(uws => new { uws.UserId, uws.SerieId });

            // Configure the relationships
            modelBuilder.Entity<Users_have_favorite_movies>()
                .HasOne(ufm => ufm.User)
                .WithMany(u => u.FavoriteMovies)
                .HasForeignKey(ufm => ufm.UserId);

            modelBuilder.Entity<Users_have_favorite_movies>()
                .HasOne(ufm => ufm.Movie)
                .WithMany(m => m.FavoritedByUsers)
                .HasForeignKey(ufm => ufm.MovieId);

            modelBuilder.Entity<Users_has_favorite_series>()
                .HasOne(ufs => ufs.User)
                .WithMany(u => u.FavoriteSeries)
                .HasForeignKey(ufs => ufs.UserId);

            modelBuilder.Entity<Users_has_favorite_series>()
                .HasOne(ufs => ufs.Serie)
                .WithMany(s => s.FavoritedByUsers)
                .HasForeignKey(ufs => ufs.SerieId);

            modelBuilder.Entity<Users_are_watching_movies>()
                .HasOne(uwm => uwm.User)
                .WithMany(u => u.WatchingMovies)
                .HasForeignKey(uwm => uwm.UserId);

            modelBuilder.Entity<Users_are_watching_movies>()
                .HasOne(uwm => uwm.Movie)
                .WithMany(m => m.WatchedMoviesByUsers)
                .HasForeignKey(uwm => uwm.MovieId);

            modelBuilder.Entity<Users_are_watching_series>()
                .HasOne(uws => uws.User)
                .WithMany(u => u.WatchingSeries)
                .HasForeignKey(uws => uws.UserId);

            modelBuilder.Entity<Users_are_watching_series>()
                .HasOne(uws => uws.Serie)
                .WithMany(m => m.WatchedSeriesByUsers)
                .HasForeignKey(uws => uws.SerieId);

            // Add further configurations as needed
        }

    }
}
