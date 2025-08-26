import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Router } from '@angular/router';

import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { RegisterRequest } from '../../models/register-request.model';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class Register {

  // Form verilerini tutmak için modelimizi kullanıyoruz.
  // Bu, [(ngModel)] ile HTML tarafına bağlanacak.
  public registerData: RegisterRequest = new RegisterRequest();
  
  // Şifre tekrar alanını tutmak için ayrı bir değişken
  public passwordRepeat: string = '';

  // Kullanıcıya geri bildirim vermek için değişkenler
  public errorMessage: string | null = null;
  public isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Form gönderildiğinde (submit) bu metot çalışır.
   * @param form - HTML'den gelen form referansı (NgForm)
   */
  public onSubmit(form: NgForm): void {
    // Her denemede eski hataları temizle
    this.errorMessage = null;

    // Form geçerli değilse işlemi durdur
    if (form.invalid) {
      this.errorMessage = "Lütfen tüm alanları doğru bir şekilde doldurun.";
      return;
    }

    // Şifrelerin eşleşip eşleşmediğini kontrol et
    if (this.registerData.password !== this.passwordRepeat) {
      this.errorMessage = "Girdiğiniz şifreler eşleşmiyor.";
      return;
    }
    
    // Yükleme animasyonunu başlat
    this.isLoading = true;

    // AuthService üzerinden kayıt olma isteğini gönder
    // Not: AuthService'de register metodu henüz yok, onu da ekleyeceğiz.
    /*
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Kayıt başarılı, kullanıcıyı login sayfasına yönlendir.
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || "Kayıt sırasında bir hata oluştu.";
      }
    });
    */

    // ŞİMDİLİK SADECE KONSOLA YAZDIRALIM
    console.log('Kayıt verileri gönderilmeye hazır:', this.registerData);
    // 2 saniye sonra yüklemeyi durdur ve hata mesajını temizle (test için)
    setTimeout(() => {
        this.isLoading = false;
    }, 2000);
  }

}
