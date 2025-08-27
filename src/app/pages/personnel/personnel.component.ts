import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- ngModel için gerekli
import { PersonnelService } from '../../services/personnel.service';
import { Personnel } from '../../models/personnel.model';

@Component({
  selector: 'app-personnel',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- buraya ekledik
  templateUrl: './personnel.html',
  styleUrls: ['./personnel.css']
})
export class PersonnelComponent implements OnInit {

  personnelList: Personnel[] = [];
  isCardVisible = false;
  selectedPersonnel: Personnel | null = null;

  // Ekleme Formu
  showAddForm = false;
  newPersonnel: Personnel = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    startDate: '',
    totalLeave: 0,
    usedLeave: 0,
    workingStatus: 'Çalışıyor', // varsayılan
    photoUrl: 'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg'
  };

  constructor(private personnelService: PersonnelService) {}

  ngOnInit() {
    this.loadPersonnel();
  }

  loadPersonnel() {
    this.personnelService.getPersonnelList().subscribe(data => {
      this.personnelList = data;
    });
  }

  openDetails(person: Personnel) {
    this.selectedPersonnel = person;
    this.isCardVisible = true;
  }

  closeDetails() {
    this.isCardVisible = false;
    this.selectedPersonnel = null;
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  addPersonnel() {
    if (!this.newPersonnel.firstName || !this.newPersonnel.lastName) return;
    this.personnelService.addPersonnel({ ...this.newPersonnel });
    this.loadPersonnel();
    this.showAddForm = false;
    this.resetForm();
  }

  deletePersonnel(id: number) {
    this.personnelService.deletePersonnel(id);
    this.loadPersonnel();
    this.closeDetails();
  }

  resetForm() {
    this.newPersonnel = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      department: '',
      startDate: '',
      totalLeave: 0,
      usedLeave: 0,
      workingStatus: 'Çalışıyor', // default
      photoUrl: 'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg'
    };
  }
}
