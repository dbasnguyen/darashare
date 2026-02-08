import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  isLoggedIn = false;
  userEmail = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.userEmail = this.auth.getEmail();
  }

  logout() {
    this.auth.logout();
    window.location.reload();
  }
}
