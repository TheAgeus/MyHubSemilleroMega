namespace MovieHubApi.Models
{
    public class Chapter
    {
        public int Id { get; set; }

        public required int season_number_c { get; set; }

        public required string title_c { get; set; }

        public required string description_c { get; set; }

        public int serie_id { get; set; }

        // Navigation property to the related Serie
        public Serie? Serie { get; set; }
    }
}
