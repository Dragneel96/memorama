import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: string = 'light';

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
    }
  }

  /**
   * This function sets the current theme for a web page and saves it to local storage.
   * @param {string} theme - a string representing the name of the theme to be set.
   */
  setTheme(theme: string): void {
    this.currentTheme = theme;
    localStorage.setItem('theme', this.currentTheme);
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
  }

  /**
   * The function returns the current theme as a string.
   * @returns The `getCurrentTheme()` method is returning a string value which is the current theme.
   * The value of `this.currentTheme` is returned.
   */
  getCurrentTheme(): string {
    return this.currentTheme;
  }
}
