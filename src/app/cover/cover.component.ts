import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-cover',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.css'
})
export class CoverComponent {
  isOnFavs : boolean = false;
  apiService = inject(ApiService);
  @Input() movie: any; 

  constructor  () {
  }

  ngOnInit(): void {
    // Asegúrate de que movie esté definido antes de acceder a sus propiedades
    if (this.movie) {
      if (this.movie['es_favorito'] === "No") {
        this.isOnFavs = false;
      } else {
        this.isOnFavs = true;
      }
    }
  }

  addFavMovie(movie_id : any) {
    let observer$ = this.apiService.addFavMovie(movie_id);
    observer$.pipe().subscribe({
      next: (data) => {
        console.log(data);
        this.isOnFavs = !this.isOnFavs
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
  eraseFavMovie(movie_id : any) {
    let observer$ = this.apiService.eraseFavMovie(movie_id);
    observer$.pipe().subscribe({
      next: (data) => {
        console.log(data);
        this.isOnFavs = !this.isOnFavs
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
