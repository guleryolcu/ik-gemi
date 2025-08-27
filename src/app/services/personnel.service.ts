import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Personnel } from '../models/personnel.model';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private mockPersonnelData: Personnel[] = [
    { id: 101, firstName: 'Ahmet', lastName: 'Yılmaz', email: 'ahmet.yilmaz@example.com', position: 'Yazılım Geliştirici', department: 'IT', startDate: '2023-05-15', totalLeave: 20, usedLeave: 5, workingStatus: 'Çalışıyor', photoUrl: 'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg' },
    { id: 102, firstName: 'Ayşe', lastName: 'Kaya', email: 'ayse.kaya@example.com', position: 'Proje Yöneticisi', department: 'Yönetim', startDate: '2022-01-20', totalLeave: 25, usedLeave: 10, workingStatus: 'İzinli', photoUrl: 'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg' }
  ];

  getPersonnelList(): Observable<Personnel[]> {
    return of(this.mockPersonnelData).pipe(delay(500));
  }

  addPersonnel(person: Personnel) {
    person.id = this.mockPersonnelData.length ? Math.max(...this.mockPersonnelData.map(p => p.id)) + 1 : 101;
    this.mockPersonnelData.push(person);
  }

  deletePersonnel(id: number) {
    this.mockPersonnelData = this.mockPersonnelData.filter(p => p.id !== id);
  }
}
