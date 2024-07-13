import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

interface Movie {
  id: number;
  category: string;
  img: string;
  title: string;
  shortDesc: string;
  fav: boolean;
}

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.css'
})

export class MediaListComponent {

  // keep track of category
  category:string = ""

  // if is serie or movie
  type:string = ""

  // filtered movies
  filteredMovies: Movie[] = []

  // all movies
  movies: Movie[] = [
    { 
      id: 1,
      category: "Fantasía",
      img: 'https://image.tmdb.org/t/p/original/cSkGnAA9b7Hj4rs51KdMsUfFpBd.jpg', 
      title: "The Lord of The Rings - Vol 1",
      shortDesc: "An epic and fantastic adventure with hobbits and some other creatures. All is about a mighty ring lol",
      fav: false
    },
    { 
      id: 2,
      category: "Terror",
      img: 'https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', 
      title: "The Conjuring",
      shortDesc: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
      fav: false
    },
    { 
      id: 3,
      category: "Terror",
      img: 'https://th.bing.com/th/id/OIP.rsE5k8cZMlOagEk6UfjPPAAAAA?rs=1&pid=ImgDetMain', 
      title: "A Nightmare on Elm Street",
      shortDesc: "The monstrous spirit of a slain janitor seeks revenge by invading the dreams of teenagers whose parents were responsible for his untimely death.",
      fav: false
    },
    {  
      id: 4,
      category: "Terror",
      img: 'https://m.media-amazon.com/images/M/MV5BYjg1YTRkNzQtODgyYi00MTQ5LThiMDYtNDJjMWRjNTdjZDZlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', 
      title: "It",
      shortDesc: "In the small town of Derry, a group of kids band together to face a shapeshifting monster that takes the form of a clown.",
      fav: false
    },
    { 
      id: 5,
      category: "Terror",
      img: 'https://image.tmdb.org/t/p/original/oWyQdmhVgUIbNuRpn272ShJrrcZ.jpg', 
      title: "The Exorcist",
      shortDesc: "When a young girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her.",
      fav: false
    }
  ];

  constructor(private route: ActivatedRoute) { }
  /* 
    Because I want to keep track my favorite movies, I need to store them in somewhere
    So, I need to load
  */
  ngOnInit() {
    // load
    this.loadFromLocalStorage();
    // get params from route, to know witch movies Im gonna show
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.type = params['type'];
      this.filterMovies();
    });
  }

  // filtering movies
  filterMovies() {
    if (this.category) {
      // If im in route of favorites
      if (this.category == "Favoritos") {
        this.filteredMovies = this.movies.filter(movie => movie.fav === true);
        return;
      }
      // otherwise filter normal
      this.filteredMovies = this.movies.filter(movie => movie.category === this.category);
    } else {
      // otherwise do not filter
      this.filteredMovies = this.movies;
    }
  }

  // change fav proportie and save it in localStorage to positive true
  addFav(movie: Movie) {
    movie.fav = !movie.fav;
    this.updateLocalStorage();
    this.filterMovies();
  }

  // change fav proportie and save it in localStorage to false
  removeFav(movie: Movie) {
    movie.fav = !movie.fav;
    this.updateLocalStorage();
    this.filterMovies();
  }

  // update local storage to keep persistence
  updateLocalStorage() {
    localStorage.setItem('movies', JSON.stringify(this.movies));
  }

  // load all movies to keep persistence from local storage
  loadFromLocalStorage() {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      this.movies = JSON.parse(storedMovies);
    }
    this.filterMovies();
  }

}

