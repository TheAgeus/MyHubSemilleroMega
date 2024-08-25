namespace MovieHubApi.Models
{
    public class Users_has_favorite_series
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int SerieId { get; set; }
        public Serie Serie { get; set; }
    }
}
