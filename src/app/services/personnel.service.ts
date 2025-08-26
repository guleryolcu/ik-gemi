import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Personnel } from '../models/personnel.model'; // Bir önceki adımda oluşturduğumuz model

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
private mockPersonnelData: Personnel[] = [
    { id: 101, firstName: 'Ahmet', lastName: 'Yılmaz', email: 'ahmet.yilmaz@example.com', position: 'Yazılım Geliştirici', department: 'IT', startDate: '2023-05-15' },
    { id: 102, firstName: 'Ayşe', lastName: 'Kaya', email: 'ayse.kaya@example.com', position: 'Proje Yöneticisi', department: 'Yönetim', startDate: '2022-01-20' },
    { id: 103, firstName: 'Mehmet', lastName: 'Demir', email: 'mehmet.demir@example.com', position: 'UI/UX Tasarımcı', department: 'Tasarım', startDate: '2023-09-01' },
    { id: 104, firstName: 'Fatma', lastName: 'Çelik', email: 'fatma.celik@example.com', position: 'İnsan Kaynakları Uzmanı', department: 'İK', startDate: '2021-11-10' },
    { id: 105, firstName: 'Mustafa', lastName: 'Öztürk', email: 'mustafa.ozturk@example.com', position: 'Sistem Analisti', department: 'IT', startDate: '2024-02-28' }
  ];

  constructor() { }

  /**
   * Tüm personelleri getiren metot.
   * 'of' ile veriyi bir Observable'a çeviriyoruz.
   * 'delay' ile sanki bir ağ gecikmesi varmış gibi 1 saniye bekletiyoruz.
   */
  getPersonnelList(): Observable<Personnel[]> {
    return of(this.mockPersonnelData).pipe(
      delay(1000) // 1 saniyelik yükleme simülasyonu
    );
  }
}
