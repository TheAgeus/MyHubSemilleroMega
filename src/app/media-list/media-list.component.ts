import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LoadingService } from '../loading-service/loading.service';
import { of, forkJoin  } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { ApiService } from '../api-service/api.service';

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

  // api service
  apiService = inject(ApiService);

  // keep track of category
  category:string = ""

  // if is serie or movie
  type:string = ""

  // filtered movies
  filteredMovies: Movie[] = []

  // all movies
  movies: any[] = [];
  
  series: any[] = [];

  constructor(private route: ActivatedRoute, public loadingService: LoadingService) { }
  /* 
    Because I want to keep track my favorite movies, I need to store them in somewhere
    So, I need to load
  */
  ngOnInit() {
    
    
    // get params from route, to know witch movies Im gonna show
    this.route.params.subscribe(params => {
      console.log(params)
      this.category = params['category'];
      this.type = params['type'];
       
      if (params['fav']) {
        console.log("favs")
        this.loadFav()
      }
      else if (this.category == undefined && this.type == undefined) {
        console.log("no categoria no tipo")
        this.loadMoviesAndSeries();
      }
      else if (this.category != '' && this.type != '') {
        console.log(this.category, this.type)
        this.loadData(this.category, this.type);
      }

    });
  }

  loadFav() {
    this.loadingService.show();

    let dataObservable1$ = this.apiService.getFavoriteMovies();
    let dataObservable2$ = this.apiService.getFavoriteSeries();

    forkJoin([dataObservable1$, dataObservable2$])
      .pipe(
        finalize(() => this.loadingService.hide()) // Hide the loading modal after data is loaded
      )
      .subscribe({
        next: ([movies, series]) => {
          console.log(movies, series)
          this.movies = movies;
          this.series = series;
        },
        error: (err) => {
          console.error('Error fetching data', err);
        }
      });
  }

  loadData(category:string, type:string) : void {
    this.loadingService.show();

    let dataObservable$;

    if (type === 'Peliculas') {
      dataObservable$ = this.apiService.getMoviesByCategory(category);
    } else if (type === 'Series') {
      dataObservable$ = this.apiService.getSeriesByCategory(category);
    } else {
      console.error('Tipo de datos no válido');
      this.loadingService.hide();
      return;
    }

    dataObservable$.pipe(
      finalize(() => this.loadingService.hide()) // Ocultar el modal de carga después de que se carguen los datos
    ).subscribe({
      next: (data) => {
        if (type === 'Peliculas') {
          this.movies = data;
          this.series = [];
        } else if (type === 'Series') {
          this.series = data;
          this.movies = [];
        }
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  loadMoviesAndSeries(): void {
    this.loadingService.show();

    forkJoin({
      movies: this.apiService.getAllMovies().pipe(
      ),
      series: this.apiService.getAllSeries().pipe(
      )
    }).pipe(
      finalize(() => this.loadingService.hide()) // Ocultar el modal de carga después de que se carguen los datos
    ).subscribe({
      next: ({ movies, series }) => {
        this.movies = movies;
        this.series = series;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }


  // change fav proportie and save it in localStorage to positive true
  addFav(movie: Movie) {
    
  }

  // change fav proportie and save it in localStorage to false
  removeFav(movie: Movie) {
    
  }


}

