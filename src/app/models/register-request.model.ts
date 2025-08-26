// src/app/models/register-request.model.ts

// Kayıt olurken API'ye gönderilecek veri modelini tanımlar.
// Class kullanmak, gelecekte metotlar eklememize olanak tanır.
export class RegisterRequest {
  username: string;
  email: string;
  password: string;

  constructor() {
    this.username = '';
    this.email = '';
    this.password = '';
  }
}