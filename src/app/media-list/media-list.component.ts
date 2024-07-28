import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LoadingService } from '../loading-service/loading.service';
import { of, forkJoin  } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { ApiService } from '../api-service/api.service';
import { CoverComponent } from '../cover/cover.component';
import { CoverSerieComponent } from "../cover-serie/cover-serie.component";

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
  imports: [CommonModule, RouterLink, CoverComponent, CoverSerieComponent],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.css'
})

export class MediaListComponent {

  // api service
  apiService = inject(ApiService);

  // is on favs
  isOnFavs:boolean = false;

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
        this.isOnFavs = true;
        console.log("favs");
        this.loadFav();
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

  // this is for view of favorites
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

  // loads all series an movies
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


  // add from db fav movie and toggles in cover item
  addFavMovie(movie_id : any) {
    let observer$ = this.apiService.addFavMovie(movie_id);
    observer$.pipe().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // erase from db fav movie and toggles in cover item
  eraseFavMovie(movie_id : any) {
    let observer$ = this.apiService.eraseFavMovie(movie_id);
    observer$.pipe().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // add from db fav serie and toggles in cover item
  addFavSerie(serie_id : any) {
    let observer$ = this.apiService.addFavSerie(serie_id);
    observer$.pipe().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // erase from db fav serie and toggles in cover item
  eraseFavSerie(serie_id : any) {
    let observer$ = this.apiService.eraseFavSerie(serie_id);
    observer$.pipe().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}

