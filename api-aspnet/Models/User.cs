namespace MovieHubApi.Models
{
    public class User
    {
        public int id { get; set; }
        public required string username_u { get; set; }
        public required string mail_u { get; set; }

        public required string password_u { get; set; }
        public string color_u { get; set; }

        public ICollection<Users_have_favorite_movies> FavoriteMovies { get; set; } = new List<Users_have_favorite_movies>();
        public ICollection<Users_has_favorite_series> FavoriteSeries { get; set; } = new List<Users_has_favorite_series>();
    
        public ICollection<Users_are_watching_movies> WatchingMovies { get; set; } = new List<Users_are_watching_movies>();
        public ICollection<Users_are_watching_series> WatchingSeries { get; set; } = new List<Users_are_watching_series>();

    }
}
