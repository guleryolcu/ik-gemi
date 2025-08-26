// src/app/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,               // Angular 20 standalone component
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [RouterLink, RouterLinkActive, RouterOutlet] // Router directives
})
export class DashboardComponent {

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Başlangıçta yapılacak işlemler
  }

  // Kullanıcı çıkışı
  logout() {
    console.log("Çıkış yapıldı!");
    this.authService.logout();
  }
}
