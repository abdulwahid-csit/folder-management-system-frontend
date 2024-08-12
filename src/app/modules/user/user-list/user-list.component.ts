import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  constructor(private modalService: BsModalService, private router: Router) { }
  columns: any = []
  modalRef?: BsModalRef;
  searchTerm: string = '';
  createUser() {
    this.modalRef = this.modalService.show(CreateUserComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        mode: 'create'
      }
    });
  }
  total_pages = 10;
  payload_size = 10;
  current_page = 1
  has_next = false
  skipped_records = 0
  total_records = 7
  userlist: any = []
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

  navigate() {
    this.router.navigate(['/userDetail']);
  }

  activeMenu: string = 'Dashboard';
  setActive(menu: string): void {
    this.activeMenu = menu;
  }

  ngOnInit(): void {
    this.columns = this.dataTable[0]?.data?.columns;
    this.userlist = this.dataTable[0].data.payload
  }
}


