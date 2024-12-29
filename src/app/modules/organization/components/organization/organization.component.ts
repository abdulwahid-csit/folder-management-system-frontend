import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateOrganizationComponent } from '../create-organization/create-organization.component';
import { OrganizationDetailsComponent } from '../organization-details/organization-details.component';
import { CrudService } from 'src/app/shared/services/crud.service';
import { AddOrganization, Organization, OrganizationState } from '../../state/organization.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent {
  searchTerm = '';
  date!: string;
  days: any[] = [];

  
  constructor() {}
  ngOnInit() {
    this.date = new Date().toISOString();
    console.log('Date:', this.date);
    this.getMonthDays();
  }

  getMonthDays() {
    let date = new Date();
    let nextDate = new Date(date);

    console.log('next date: ', nextDate.toISOString());
    // console.log('date next: ', date.setMilliseconds)
    for (let i = 0; i < 31; i++) {
      nextDate.setDate(nextDate.getDate() + 1);
      this.days.push(nextDate.toISOString());
    }
    this.days.push(this.date);
    console.log('30 days: ', this.days);
  }
}
