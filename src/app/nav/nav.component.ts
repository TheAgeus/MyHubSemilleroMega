import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api-service/api.service';

interface Option {
  title: string;
  route: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent {

  apiService = inject(ApiService);

  category: string = '';

  isShowedMenu: boolean = false;

  constructor () {
    this.SetInitialMovieCategories()
    this.SetInitialSerieCategories()
  }

  ngOnInit(){
    
  }

  movieCategories: string[] = [
    'Fantasía', 
    'Terror',
  ]

  serieCategories: string[] = [
  ]
  
  otherMenuElements: Option[] = [
    { title:'Favoritos', route:'/Dashboard/List_fav/Favorites' },
    { title:'Viendo', route:'/Dashboard/List_watch/Viendo' },
    { title:'Configuracion', route: '/Dashboard/Config' },
  ]
  
  // for showing my menu
  showMenu() {
    this.isShowedMenu = true;
  }

  logout(): void {
    this.apiService.logout();
  }

  // for hidding my menu
  hideMenu() {
    this.isShowedMenu = false;
  }
  SetInitialMovieCategories() {
    this.apiService.getMovieCategories().subscribe(
      (categories: any[]) => {
        this.movieCategories = categories.map(category => category);
      },
      (error) => {
        console.error('Error fetching movie categories', error);
      }
    );
  }

  SetInitialSerieCategories() {
    this.apiService.getSerieCategories().subscribe(
      (categories: any[]) => {
        this.serieCategories = categories.map(category => category);
      },
      (error) => {
        console.error('Error fetching serie categories', error);
      }
    );
  }
}
