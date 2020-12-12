import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public username = localStorage.getItem('name');

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout(): any {
    this.authService.userLogout();
    if (!(!!localStorage.getItem('token'))) {
      this.router.navigate(['/login']);
    }
  }

}
