import { Component } from '@angular/core';
import { InviteMemberComponent } from '../invite-member/invite-member.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.scss']
})
export class TeamMemberListComponent {
  constructor(private modalService: BsModalService) { }

  columns: any = []

  total_pages = 10;
  payload_size = 10;
  current_page = 1
  has_next = false
  skipped_records = 0
  total_records = 7
  modalRef?: BsModalRef;
  searchTerm: string = '';

  organizationList: any = []
  dataTable: any = [
    {
      data: {
        columns: [
          {
            name: 'Email',
          },
          {
            name: 'Full Name',
          },
          {
            name: 'Orgnization',
          },
          {
            name: 'Role',
          },
          {
            name: 'status',
          },
          {
            name: 'Creation Date',
          }
        ],
        payload: [
          {
            "id": 1,
            "name": "Hassa-ali@4iisolutions.com",
            "fullName": "Abdul Basit",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "organization": "Ideal solutions",
            "role": "Admin",
            "status": 'active',
            "creationDate": '12-8-2024'
          },
          {
            "id": 1,
            "name": "Hassa-ali@4iisolutions.com",
            "fullName": "Abdul Basit",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "organization": "Ideal solutions",
            "role": "Admin",
            "status": 'active',
            "creationDate": '12-8-2024'
          },
          {
            "id": 1,
            "name": "Hassa-ali@4iisolutions.com",
            "fullName": "Abdul Basit",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "organization": "Ideal solutions",
            "role": "Admin",
            "status": 'inactive',
            "creationDate": '12-8-2024'
          },
          {
            "id": 1,
            "name": "Hassa-ali@4iisolutions.com",
            "fullName": "Abdul Basit",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "organization": "Ideal solutions",
            "role": "Admin",
            "status": 'active',
            "creationDate": '12-8-2024'
          },
          {
            "id": 1,
            "name": "Hassa-ali@4iisolutions.com",
            "fullName": "Abdul Basit",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "organization": "Ideal solutions",
            "role": "Admin",
            "status": 'active',
            "creationDate": '12-8-2024'
          },
          {
            "id": 1,
            "name": "Hassa-ali@4iisolutions.com",
            "fullName": "Abdul Basit",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "organization": "Ideal solutions",
            "role": "Admin",
            "status": 'inactive',
            "creationDate": '12-8-2024'
          },
          {
            "id": 1,
            "name": "Hassa-ali@4iisolutions.com",
            "fullName": "Abdul Basit",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "organization": "Ideal solutions",
            "role": "Admin",
            "status": 'active',
            "creationDate": '12-8-2024'
          },
        ]
      }
    }
  ]

  // assign the data from api like total_pages, payload_size
  tableConfig = {
    paginationParams: {
      "total_pages": this.total_pages,
      "payload_size": this.payload_size,
      "has_next": this.has_next,
      "current_page": this.current_page,
      "skipped_records": this.skipped_records,
      "total_records": this.total_records
    }
  };

  ngOnInit(): void {
    this.columns = this.dataTable[0]?.data?.columns;
    this.organizationList = this.dataTable[0].data.payload
  }

  createOganization() {
    // const initialState = { data, type: 'asset' };
    this.modalRef = this.modalService.show(InviteMemberComponent, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      // initialState,
    });
  }
}
