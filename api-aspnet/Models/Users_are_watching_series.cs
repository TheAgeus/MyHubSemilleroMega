namespace MovieHubApi.Models
{
    public class Users_are_watching_series
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int SerieId { get; set; }
        public Serie Serie { get; set; }
    }
}
