import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CreateRoleComponent } from '../create-role/create-role.component';
@Component({
  selector: 'app-roles-permission-list',
  templateUrl: './roles-permission-list.component.html',
  styleUrls: ['./roles-permission-list.component.scss']
})
export class RolesPermissionListComponent {
  constructor(private modalService: BsModalService, private router: Router) { }
  columns: any = []
  modalRef?: BsModalRef;
  searchTerm: string = '';
  total_pages = 10;
  payload_size = 10;
  current_page = 1
  has_next = false
  skipped_records = 0
  total_records = 7
  roleslist: any = []
  
  permissionUser() {
    this.modalRef = this.modalService.show(CreateRoleComponent, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        mode: 'create'
      }
    });
  }
  dataTable: any = [
    {
      data: {
        columns: [
          {
            name: 'Name',
          },
          {
            name: 'domain',
          },
          {
            name: 'Total No. Of Applications',
          },
          {
            name: 'users',
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
            "name": "organizations 1",
            "domain": null,
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "total_no_of_application": 15,
            "users": 199,
            "status": 'active',
            "creationDate": '12-8-2024'
          },
          {
            "id": 3,
            "name": "organizations 1",
            "domain": "https://adminv2-dev.techbar.com/auth/login",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "total_no_of_application": 10,
            "users": 588,
            "status": 'inactive',
            "creationDate": '01-8-2024'
          },
          {
            "id": 7,
            "name": "organizations 67",
            "domain": "http://kham.ai",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "total_no_of_application": 1,
            "users": 900,
            "status": 'active',
            "creationDate": '15-8-2024'
          },
          {
            "id": 9,
            "name": "created",
            "domain": "http://kham.ai",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "total_no_of_application": 14,
            "users": 189,
            "status": 'inactive',
            "creationDate": '30-8-2024'
          },
          {
            "id": 8,
            "name": "created updated 8",
            "domain": "http://kham.bi",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "total_no_of_application": 7,
            "users": 130,
            "status": 'active',
            "creationDate": '12-10-2023'
          },
          {
            "id": 11,
            "name": "organization 01",
            "domain": "http://web.ai",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "total_no_of_application": 10,
            "users": 150,
            "status": 'inactive',
            "creationDate": '12-8-2024'
          },
          {
            "id": 10,
            "name": "backend development",
            "domain": "http://backend.dev",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": true,
            "total_no_of_application": 1,
            "users": 114,
            "status": 'active',
            "creationDate": '12-12-2023'
          }
        ],
        paginate_options: {
          "total_pages": 1,
          "payload_size": 7,
          "has_next": false,
          "current_page": 1,
          "skipped_records": 0,
          "total_records": 7
        }
      }
    }
  ]
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
    this.roleslist = this.dataTable[0].data.payload
  }
  activeMenu: string = 'Dashboard';
  setActive(menu: string): void {
    this.activeMenu = menu;
  }
}
