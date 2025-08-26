import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Bir rotanın sadece giriş yapmış kullanıcılar tarafından erişilebilir olup olmadığını kontrol eden bir Rota Koruyucusu.
 * @returns Kullanıcının rotaya erişip erişemeyeceğini belirten bir boolean veya Promise<boolean>.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Gerekli servisleri 'inject' fonksiyonu ile enjekte ediyoruz.
  // Bu, modern Angular'da fonksiyon tabanlı guard'lar için standart yöntemdir.
  const authService = inject(AuthService);
  const router = inject(Router);

  // AuthService üzerinden kullanıcının giriş yapıp yapmadığını kontrol ediyoruz.
  if (authService.isAuthenticated()) {
    // Eğer kullanıcı giriş yapmışsa, rotaya erişime izin veriyoruz.
    return true;
  } else {
    // Eğer kullanıcı giriş yapmamışsa, onu giriş sayfasına yönlendiriyoruz.
    router.navigate(['/login']);
    // Ve rotaya erişimi engelliyoruz.
    return false;
  }
};
