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
  largeDesc: string;
}

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})

export class DetalleComponent {

  // For knowing what movie im gonna show, for filtering
  movieId: number = 0;

  // The movie filtered
  movie: Movie = { id: 0, category: "", img: "", title: "", shortDesc: "", largeDesc: "" };
  
  // All movies with a large desc
  movies: Movie[] = [
    { 
      id: 1,
      category: "Fantasía",
      img: 'https://image.tmdb.org/t/p/original/cSkGnAA9b7Hj4rs51KdMsUfFpBd.jpg', 
      title: "The Lord of The Rings - Vol 1",
      shortDesc: "An epic and fantastic adventure with hobbits and some other creatures. All is about a mighty ring lol",
      largeDesc: " simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las"
    },
    { 
      id: 2,
      category: "Terror",
      img: 'https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', 
      title: "The Conjuring",
      shortDesc: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
      largeDesc: "e la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, consecteur, en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de de Finnibus Bonorum et Malorum (Los Extremos del Bien y El Mal) por Cicero, escrito en el "
      
    },
    { 
      id: 3,
      category: "Terror",
      img: 'https://th.bing.com/th/id/OIP.rsE5k8cZMlOagEk6UfjPPAAAAA?rs=1&pid=ImgDetMain', 
      title: "A Nightmare on Elm Street",
      shortDesc: "The monstrous spirit of a slain janitor seeks revenge by invading the dreams of teenagers whose parents were responsible for his untimely death.",
      largeDesc: "lido) en la Internet. Usa un diccionario de mas de 200 palabras provenientes del latín, combinadas con estructuras muy útiles de sentencias, para generar texto de Lorem Ipsum que parezca razonable. Este Lorem veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis "
      
    },
    {  
      id: 4,
      category: "Terror",
      img: 'https://m.media-amazon.com/images/M/MV5BYjg1YTRkNzQtODgyYi00MTQ5LThiMDYtNDJjMWRjNTdjZDZlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', 
      title: "It",
      shortDesc: "In the small town of Derry, a group of kids band together to face a shapeshifting monster that takes the form of a clown.", 
      largeDesc: " veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis "
      
    },
    { 
      id: 5,
      category: "Terror",
      img: 'https://image.tmdb.org/t/p/original/oWyQdmhVgUIbNuRpn272ShJrrcZ.jpg', 
      title: "The Exorcist",
      shortDesc: "When a young girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her." ,
      largeDesc: " veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis "

    }
  ];

  constructor(private route: ActivatedRoute) { }

  // For filter on init
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];  // Ensure movieId is a number
      this.filterMovie();
    });
  }

  // filter movies to the one im gonna show
  filterMovie() {
    this.movie = this.movies.find(movie => movie.id === this.movieId) || { id: 0, category: "", img: "", title: "", shortDesc: "", largeDesc: "" };
  }
}
