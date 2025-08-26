// Kullanıcı girişi sırasında API'ye gönderilecek veri modelini tanımlar.
export interface LoginRequest {
  Email: string;
  Password: string;
}