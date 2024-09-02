import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateRoleComponent } from '../create-role/create-role.component';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
@Component({
  selector: 'app-roles-permission-list',
  templateUrl: './roles-permission-list.component.html',
  styleUrls: ['./roles-permission-list.component.scss']
})
export class RolesPermissionListComponent implements OnInit {
  columns: any = [];
  roleslist: any = [];
  modalRef?: BsModalRef;
  searchTerm: string = '';
  activeMenu: string = 'Dashboard';
  searchType: boolean = false;

  tableConfig = {
    paginationParams: {
      "total_pages": 0,
      "payload_size": 0,
      "has_next": false,
      "current_page": 1, 
      "skipped_records": 0,
      "total_records": 0
    }
  };

  constructor(
    private modalService: BsModalService,
    private crudService: CrudService,
    public localStoreService: LocalStoreService,
  ) { }

  ngOnInit(): void {
    this.getRolePermissionListing(1); 
  }

  getRolePermissionListing(page: number) {
    // let urlData = `access/roles?page=${page}&limit=10`;
    // if (this.searchTerm) {
    //   urlData += `&search=${this.searchTerm}`;
    // }
    let urlData = `access/roles?page=${page}&limit=10`;
    if(this.localStoreService.getUserRole().toLowerCase() !== 'master'){
      urlData += `&organization=${this.localStoreService.getUserOrganization()}`;
    }

    if(this.searchType){
      urlData += `&search=${this.searchTerm}`;
    }

    this.crudService.read(urlData).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        this.roleslist = response.data.payload || [];
        const column = Object.keys(this.roleslist[0] || {});
        this.columns = column.filter((col: string) =>
          !['id', 'email_verified', 'permissions', 'timezone', 'active', 'organization', 'last_name', 'updated_by'].includes(col)
        );

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
    }, error => {
      console.error('HTTP error:', error);
    });
  }

  permissionUser() {
    this.modalRef = this.modalService.show(CreateRoleComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        mode: 'create'
      }
    });
    this.modalRef.content.successCall.subscribe(() => {
      this.getRolePermissionListing(this.tableConfig.paginationParams.current_page);
    });
  }

  // onKeyChange(event: KeyboardEvent) {
  //   if (event.key === 'Enter' || this.searchTerm === '') {
  //     this.getRolePermissionListing(1); 
  //   }
  // }
  onKeyChange(item: any) {
    this.searchType = false;

    if (item.keyCode == 13) {
      this.searchType = true;
      this.getRolePermissionListing(1);
    } else if (this.searchTerm == '') {
      this.getRolePermissionListing(1);
    }
  }

  onPageChange(page: number) {
    this.getRolePermissionListing(page);
  }

  setActive(menu: string): void {
    this.activeMenu = menu;
  }
}
