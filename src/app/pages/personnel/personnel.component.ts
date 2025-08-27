import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PersonnelItem {
  name: string;
  title: string;
  email: string;
  photoUrl: string;
}

@Component({
  selector: 'app-personnel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personnel.html',
  styleUrls: ['./personnel.css']
})
export class Personnel {

  isCardVisible = false; // Detay kutusu görünür mü?
  selectedPersonnel: PersonnelItem | null = null;

  personnelList: PersonnelItem[] = [
    {
      name: 'Büşra Güneş',
      title: 'İnsan Kaynakları',
      email: 'busra.gunes@example.com',
      photoUrl: 'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg'
    },
    {
      name: 'Güler Yolcu',
      title: 'Stajyer',
      email: 'guler.yolcu@example.com',
      photoUrl: 'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg'
    },
    {
      name: 'Ahmet Demir',
      title: 'Sistem Analisti',
      email: 'ahmet.demir@example.com',
      photoUrl: 'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg'
    },
    {
      name: 'Ayşe Kaya',
      title: 'UI/UX Tasarımcı',
      email: 'ayse.kaya@example.com',
      photoUrl: 'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg'
    }
  ];

  openDetails(person: PersonnelItem) {
    this.selectedPersonnel = person;
    this.isCardVisible = true;
  }

  closeDetails() {
    this.isCardVisible = false;
    this.selectedPersonnel = null;
  }
}
