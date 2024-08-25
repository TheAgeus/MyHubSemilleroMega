namespace MovieHubApi.Models
{
    public class Movie
    {
        public int id { get; set; }
        public required string name_m { get; set; }
        public required string description_m { get; set; }

        public required string category_m { get; set; }
        public required string img_url { get; set; }

        public ICollection<Users_have_favorite_movies> FavoritedByUsers { get; set; } = new List<Users_have_favorite_movies>();
        public ICollection<Users_are_watching_movies> WatchedMoviesByUsers { get; set; } = new List<Users_are_watching_movies>();
    }
}
