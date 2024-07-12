import { Component, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';


interface Movie {
  id: number;
  category: string;
  img: string;
  title: string;
  shortDesc: string;
}

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.css'
})
export class MediaListComponent {

  category:string = ""

  type:string = ""

  filteredMovies: Movie[] = []

  movies: Movie[] = [
    { 
      id: 1,
      category: "Fantasía",
      img: 'https://image.tmdb.org/t/p/original/cSkGnAA9b7Hj4rs51KdMsUfFpBd.jpg', 
      title: "The Lord of The Rings - Vol 1",
      shortDesc: "An epic and fantastic adventure with hobbits and some other creatures. All is about a mighty ring lol" 
    },
    { 
      id: 2,
      category: "Terror",
      img: 'https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', 
      title: "The Conjuring",
      shortDesc: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse." 
    },
    { 
      id: 3,
      category: "Terror",
      img: 'https://th.bing.com/th/id/OIP.rsE5k8cZMlOagEk6UfjPPAAAAA?rs=1&pid=ImgDetMain', 
      title: "A Nightmare on Elm Street",
      shortDesc: "The monstrous spirit of a slain janitor seeks revenge by invading the dreams of teenagers whose parents were responsible for his untimely death." 
    },
    {  
      id: 4,
      category: "Terror",
      img: 'https://m.media-amazon.com/images/M/MV5BYjg1YTRkNzQtODgyYi00MTQ5LThiMDYtNDJjMWRjNTdjZDZlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', 
      title: "It",
      shortDesc: "In the small town of Derry, a group of kids band together to face a shapeshifting monster that takes the form of a clown." 
    },
    { 
      id: 5,
      category: "Terror",
      img: 'https://image.tmdb.org/t/p/original/oWyQdmhVgUIbNuRpn272ShJrrcZ.jpg', 
      title: "The Exorcist",
      shortDesc: "When a young girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her." 
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.type = params['type'];
      this.filterMovies();
    });
  }

  filterMovies() {
    if (this.category) {
      this.filteredMovies = this.movies.filter(movie => movie.category === this.category);
    } else {
      this.filteredMovies = this.movies;
    }
  }

}

