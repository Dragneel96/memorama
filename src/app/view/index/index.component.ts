import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  username: string;

  constructor(private router: Router) {
    this.username = "";
  }

  saveusername() {
    if (this.username) { // Verifica si el nombre de usuario no está vacío
      localStorage.setItem('username', this.username); // Guarda el nombre de usuario en localStorage
      this.router.navigateByUrl('/memorama'); // Redirecciona a /memorama
    }
  }

}

