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

  setTheme(theme: string): void {
    this.currentTheme = theme;
    localStorage.setItem('theme', this.currentTheme);
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
}
