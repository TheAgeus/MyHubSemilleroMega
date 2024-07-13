import { Component } from '@angular/core';
import { FontColorService } from '../services/font-color.servise';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor(private fontColorService: FontColorService) {}

  saveColor(color: string) {
    this.fontColorService.setColor(color);
  }
}
