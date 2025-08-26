// // src/app/services/auth.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Router } from '@angular/router';

// import { LoginRequest } from '../models/login-request.model';
// import { RegisterRequest } from '../models/register-request.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:5278/api/auth';

//   //private readonly apiUrl = 'https://sizin-api-adresiniz.com/api/auth'; // <-- Kendi API adresinizle değiştirin!

//   constructor(
//     private http: HttpClient,
//     private router: Router
//   ) { }

//   public login(data: LoginRequest): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, data);
//   }

//   public register(data: RegisterRequest): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, data);
//   }

//   public redirectToDashboard(role: string): void {
//     if (role === 'Admin') {
//       this.router.navigate(['/admin-dashboard']);
//     } else {
//       this.router.navigate(['/dashboard']);
//     }
//   }

//   /**
//    * HATA DÜZELTİLDİ: Eksik olan bu metot eklendi.
//    * Kullanıcının giriş yapıp yapmadığını kontrol eder.
//    * localStorage'da bir 'accessToken' olup olmadığını kontrol ederek basit bir doğrulama yapar.
//    * @returns Kullanıcı giriş yapmışsa true, yapmamışsa false döner.
//    */
//   public isAuthenticated(): boolean {
//     // !! (çift ünlem) operatörü, bir değeri boolean (true/false) karşılığına çevirir.
//     // Eğer localStorage.getItem('accessToken') bir değer döndürürse (string), sonuç true olur.
//     // Eğer null döndürürse, sonuç false olur.
//     return !!localStorage.getItem('accessToken');
//   }

//   public logout(): void {
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }
// }

// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'; // <-- YENİ: tap operatörünü import ediyoruz

import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';

// YENİ: API'den gelen başarılı giriş yanıtının modelini tanımlamak best practice'tir.
interface LoginResponse {
  accessToken: string;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5278/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // DEĞİŞTİ: login metodunu güncelliyoruz.
  public login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data).pipe(
      // tap operatörü, Observable'dan gelen veriye "dokunmamızı" sağlar.
      // Yani, veri akışını bozmadan araya girip işlem yapabiliriz.
      tap((response: LoginResponse) => {
        // API'den başarılı bir yanıt geldiğinde bu blok çalışır.
        if (response && response.accessToken && response.username) {
          // Gelen token, kullanıcı adı ve rolü localStorage'a kaydediyoruz.
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('username', response.username);
          localStorage.setItem('userRole', response.role);
        }
      })
    );
  }

  public register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // YENİ: Kullanıcı adını localStorage'dan getiren metot.
  public getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // YENİ: Kullanıcı rolünü localStorage'dan getiren metot.
  public getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  public redirectToDashboard(role: string): void {
    if (role === 'Admin') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  public logout(): void {
    // Sadece token'ı değil, tüm kullanıcı bilgilerini temizlemek daha doğrudur.
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    // localStorage.clear(); // Alternatif olarak her şeyi temizler.
    
    this.router.navigate(['/login']);
  }
}