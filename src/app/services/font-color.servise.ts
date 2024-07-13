import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontColorService {
  private localStorageKey = 'fontColor';

  constructor() {
    this.applyColorFromLocalStorage();
  }

  // seems to be that local storage isnt available sometimes so
  // this helps the app to no crash
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // set in local storage my color and apply it
  setColor(color: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.localStorageKey, color);
      this.applyColor(color);
    }
  }

  // get color from local storage and applay it
  applyColorFromLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      const color = window.localStorage.getItem(this.localStorageKey);
      if (color) {
        this.applyColor(color);
      }
    }
  }

  // apply color
  private applyColor(color: string) {
    document.documentElement.style.setProperty('--font-color', color);
  }
}