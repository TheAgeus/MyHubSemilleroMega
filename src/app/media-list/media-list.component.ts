import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LoadingService } from '../loading-service/loading.service';
import { of } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';

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
    },
    {
      id: 6,
      category: "Fantasía",
      img: 'https://is5-ssl.mzstatic.com/image/thumb/Video128/v4/61/d0/b3/61d0b322-414b-a7ba-dfdc-4c4a0e4663ad/source/900x900bb.jpg',
      title: "Harry Potter and the Sorcerer's Stone",
      shortDesc: "An orphaned boy discovers he is a wizard on his 11th birthday and goes on to attend a magical school, uncovering the truth about his parents and his destiny.",
      fav: false
    },
    {
      id: 7,
      category: "Terror",
      img: 'https://th.bing.com/th/id/OIP.RbvsiuoskRaf_vnuiJ0nKQHaLH?rs=1&pid=ImgDetMain',
      title: "Hereditary",
      shortDesc: "After the death of their secretive grandmother, a family is haunted by tragic and disturbing occurrences, unraveling dark secrets about their ancestry.",
      fav: false
    },
    {
      id: 8,
      category: "Terror",
      img: 'https://image.tmdb.org/t/p/original/ArPWMf2leE6H9IIJ3tHVt6uewLR.jpg',
      title: "The Babadook",
      shortDesc: "A single mother and her child fall into a deep well of paranoia when an eerie children's book titled 'Mister Babadook' manifests in their home.",
      fav: false
    }
  ];

  constructor(private route: ActivatedRoute, public loadingService: LoadingService) { }
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
  /*
  loadFromLocalStorage() {

    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      this.movies = JSON.parse(storedMovies);
    }
    this.filterMovies();
  }
  */

  loadFromLocalStorage() {
    this.loadingService.show(); // Show loading modal

    of(localStorage.getItem('movies'))
      .pipe(
        delay(1000), // Simulate a delay for loading
        finalize(() => this.loadingService.hide()) // Hide loading modal after data is loaded
      )
      .subscribe(storedMovies => {
        if (storedMovies) {
          this.movies = JSON.parse(storedMovies);
        }
        this.filterMovies();
      });
  }


  // filtering movies
  filterMovies() {
    this.loadingService.show();
    of(() => {
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
    })
    .pipe(
      delay(1000), // Simulate a delay for loading
      finalize(() => this.loadingService.hide()) // Hide loading modal after data is loaded
    )
    .subscribe(_filtered => {
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
    });
  }

}

