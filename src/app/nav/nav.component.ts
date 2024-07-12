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
    { title:'Cerrar sesión', route:'/' }
  ]
  

  showMenu() {
    this.isShowedMenu = true;
  }

  hideMenu() {
    this.isShowedMenu = false;
  }

}
