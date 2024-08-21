import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CreateRoleComponent } from '../create-role/create-role.component';
import { CrudService } from 'src/app/shared/services/crud.service';
@Component({
  selector: 'app-roles-permission-list',
  templateUrl: './roles-permission-list.component.html',
  styleUrls: ['./roles-permission-list.component.scss']
})
export class RolesPermissionListComponent {
  constructor(private modalService: BsModalService, private router: Router, private crudService: CrudService,) { }
  columns: any = []
  roleslist: any = []
  modalRef?: BsModalRef;
  searchTerm: string = '';
  activeMenu: string = 'Dashboard';

  permissionUser() {
    this.modalRef = this.modalService.show(CreateRoleComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        mode: 'create'
      }
    });
  }

  tableConfig = {
    paginationParams: {
      "total_pages": 0,
      "payload_size": 0,
      "has_next": false,
      "current_page": 0,
      "skipped_records": 0,
      "total_records": 0
    }
  };

  ngOnInit(): void {
    this.getRolePermissionListing()
  }

  getRolePermissionListing() {
    this.crudService.read('access/roles').subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        if (response.data.payload.length > 0) {
          const column = Object.keys(response.data.payload[0]);
          this.columns = column.filter((column: string) => column !== 'id' &&
            column !== 'email_verified' && column !== 'permissions' && column !== 'timezone'
            && column !== 'active' && column !== 'organization' && column !== 'last_name');
          this.roleslist = response.data.payload;

          this.tableConfig = {
            paginationParams: {
              "total_pages": response.data.paginate_options.total_pages,
              "payload_size": response.data.paginate_options.payload_size,
              "has_next": response.data.paginate_options.has_next,
              "current_page": response.data.paginate_options.current_page,
              "skipped_records": response.data.paginate_options.skipped_records,
              "total_records": response.data.paginate_options.total_records
            }
          };
        }
      }

    }, error => {
      console.error('HTTP error:', error);
    });
  }


  setActive(menu: string): void {
    this.activeMenu = menu;
  }
}
