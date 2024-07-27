import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-cover-serie',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cover-serie.component.html',
  styleUrl: './cover-serie.component.css'
})
export class CoverSerieComponent {
  isOnFavs : boolean = false;
  apiService = inject(ApiService);
  @Input() serie: any; 


  constructor  () {
  }

  ngOnInit(): void {
    // Asegúrate de que movie esté definido antes de acceder a sus propiedades
    if (this.serie) {
      if (this.serie['es_favorito'] === "No") {
        this.isOnFavs = false;
      } else {
        this.isOnFavs = true;
      }
    }
  }

  // change fav proportie and save it in localStorage to positive true
  addFavSerie(serie_id : any) {
    let observer$ = this.apiService.addFavSerie(serie_id);
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

  // change fav proportie and save it in localStorage to false
  eraseFavSerie(serie_id : any) {
    let observer$ = this.apiService.eraseFavSerie(serie_id);
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
