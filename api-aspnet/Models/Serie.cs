namespace MovieHubApi.Models
{
    public class Serie
    {
        public int id { get; set; }
        public required string name_s { get; set; }
        public required string description_s { get; set; }

        public required string category_s { get; set; }
        public required string img_url { get; set; }

        public ICollection<Users_has_favorite_series> FavoritedByUsers { get; set; } = new List<Users_has_favorite_series>();
        public ICollection<Users_are_watching_series> WatchedSeriesByUsers { get; set; } = new List<Users_are_watching_series>();

    }
}
