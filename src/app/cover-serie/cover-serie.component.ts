import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cover-serie',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule, RouterModule ],
  templateUrl: './cover-serie.component.html',
  styleUrl: './cover-serie.component.css'
})
export class CoverSerieComponent {
  isOnFavs : boolean = false;
  isOnWatch : boolean = false;
  apiService = inject(ApiService);
  @Input() serie: any = {}; 


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

    if (this.serie) {
      if (this.serie['es_viendo'] === "No") {
        this.isOnWatch = false;
      } else {
        this.isOnWatch = true;
      }
    }
  }

  // toggles is on fav of serie and add or erase record in database
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

  addWatchSerie(serie_id : any) {
    let observer$ = this.apiService.addWatchSerie(serie_id);
    observer$.pipe().subscribe({
      next: (data) => {
        console.log(data);
        this.isOnWatch = !this.isOnWatch
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // toggles is on fav of serie and add or erase record in database
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

  eraseWatchSerie(serie_id : any) {
    let observer$ = this.apiService.eraseWatchSerie(serie_id);
    observer$.pipe().subscribe({
      next: (data) => {
        console.log(data);
        this.isOnWatch = !this.isOnWatch
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
