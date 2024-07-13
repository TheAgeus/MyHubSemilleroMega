import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  category: string = '';

  isShowedMenu: boolean = false;

  movieCategories: string[] = [
    'Fantasía', 
    'Terror',
  ]

  serieCategories: string[] = [
  ]
  
  otherMenuElements: Option[] = [
    { title:'Favoritos', route:'/Dashboard/Peliculas/Favoritos' },
    { title:'Configuracion', route: '/Dashboard/Config' },
    { title:'Cerrar sesión', route:'/' }
  ]
  
  // for showing my menu
  showMenu() {
    this.isShowedMenu = true;
  }

  // for hidding my menu
  hideMenu() {
    this.isShowedMenu = false;
  }

}
