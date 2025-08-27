import { Component, OnInit } from '@angular/core';
import { Personnel } from '../../models/personnel.model';  // <- model yolu
import { PersonnelService } from '../../services/personnel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permission.html',
  styleUrls: ['./permission.css']
})

export class Permission implements OnInit {

  personnels: Personnel[] = [];
  loading = true;

  constructor(private personnelService: PersonnelService) { }

  ngOnInit(): void {
    this.personnelService.getPersonnelList().subscribe(data => {
      this.personnels = data;
      this.loading = false;
    });
  }

  getRemainingLeave(personnel: Personnel): number {
    return personnel.totalLeave - personnel.usedLeave;
  }
}
