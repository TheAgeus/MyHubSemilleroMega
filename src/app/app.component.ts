import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { FontColorService } from './color-service/font-color.servise';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    SettingsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private fontColorService: FontColorService) {
    this.fontColorService.applyColorFromLocalStorage();
  }

  title = 'MyHubSemilleroMega';
}
