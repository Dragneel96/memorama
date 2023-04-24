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

  /**
   * The function saves the username in localStorage and redirects to the /memorama page if the
   * username is not empty.
   */
  saveusername() {
    if (this.username) {
      localStorage.setItem('username', this.username);
      this.router.navigateByUrl('/memorama');
    }
  }

}

