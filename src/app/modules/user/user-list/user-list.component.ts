import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Store } from '@ngxs/store';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  
  columns: any = []
  userList: any = []
  modalRef?: BsModalRef;
  searchTerm: string = '';
  
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

  constructor(
    private modalService: BsModalService, 
    private router: Router, 
    private crudService: CrudService,
    private store: Store,
    public localStoreService: LocalStoreService
  ) { }

  ngOnInit(): void {
    this.userListing()
  }

  createUser(user?: any) {
    const initialState = {
      mode: user ? 'update' : 'create',
      userData: user || null,
      userId: user ? user.id : null
      // userId: user ? user.id : 0 
    }
    this.modalRef = this.modalService.show(CreateUserComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: initialState
    });

    this.modalRef.content.successCall.subscribe(() => {
      this.userListing();
    });
  }

  userListing() {
    this.crudService.read('users').subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        if (response.data.payload.length > 0) {
          const column = Object.keys(response.data.payload[0]);
          this.columns = column.filter((column: string) => column !== 'id' &&
            column !== 'email_verified' && column !== 'permissions' && column !== 'timezone' &&
            column !== 'username' && column !== 'updated_at' && column !== 'profile_picture' && column !== 'last_name');
          this.userList = response.data.payload;

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


  navigate() {
    this.router.navigate(['/userDetail']);
  }

  activeMenu: string = 'Dashboard';
  setActive(menu: string): void {
    this.activeMenu = menu;
  }
  
  viewUserDetail(user: any) {
    this.router.navigate(['/user-detail', user.id]);
  }
}


