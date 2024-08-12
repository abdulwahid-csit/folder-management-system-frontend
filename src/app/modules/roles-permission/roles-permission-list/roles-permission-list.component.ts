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
            name: 'Role NAme',
          },
          {
            name: 'Description',
          },
          {
            name: 'User Count',
          },
          {
            name: 'Created by',
          },
          {
            name: 'Creation Date',
          }
        ],
        payload: [
          {
            "id": 1,
            "name": "Owner",
            "description": "Lorem ipsum adalah contoh teks atau dummy dalam .....",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "users": 199,
            "createdBy": "Hassa-ali",
            "creationDate": '12-8-2024'
          },
          {
            "id": 1,
            "name": "Owner",
            "description": "Lorem ipsum adalah contoh teks atau dummy dalam .....",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "users": 199,
            "createdBy": "Hassa-ali",
            "creationDate": '12-8-2024'
          },
          {
            "id": 1,
            "name": "Owner",
            "description": "Lorem ipsum adalah contoh teks atau dummy dalam .....",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "users": 199,
            "createdBy": "Hassa-ali",
            "creationDate": '12-8-2024'
          },
          {
            "id": 1,
            "name": "Owner",
            "description": "Lorem ipsum adalah contoh teks atau dummy dalam .....",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "users": 199,
            "createdBy": "Hassa-ali",
            "creationDate": '12-8-2024'
          },
          {
            "id": 1,
            "name": "Owner",
            "description": "Lorem ipsum adalah contoh teks atau dummy dalam .....",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "users": 199,
            "createdBy": "Hassa-ali",
            "creationDate": '12-8-2024'
          },
          {
            "id": 1,
            "name": "Owner",
            "description": "Lorem ipsum adalah contoh teks atau dummy dalam .....",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "users": 199,
            "createdBy": "Hassa-ali",
            "creationDate": '12-8-2024'
          },
          {
            "id": 1,
            "name": "Owner",
            "description": "Lorem ipsum adalah contoh teks atau dummy dalam .....",
            "domain_verified": false,
            "created_at": {},
            "updated_at": {},
            "is_archive": false,
            "users": 199,
            "createdBy": "Hassa-ali",
            "creationDate": '12-8-2024'
          },
          
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
