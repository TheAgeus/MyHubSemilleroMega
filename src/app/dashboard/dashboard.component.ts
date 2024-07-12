import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { MediaListComponent } from '../media-list/media-list.component';
import { NavComponent } from '../nav/nav.component';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MediaListComponent, NavComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
