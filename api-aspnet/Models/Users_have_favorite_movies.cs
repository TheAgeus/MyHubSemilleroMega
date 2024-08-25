

namespace MovieHubApi.Models
{
    public class Users_have_favorite_movies
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int MovieId { get; set; }
        public Movie Movie { get; set; }

    }
}
