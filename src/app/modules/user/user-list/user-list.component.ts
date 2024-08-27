import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  columns: any[] = [];
  userList: any[] = [];
  modalRef?: BsModalRef;
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  activeMenu: string = 'Dashboard';

  tableConfig = {
    paginationParams: {
      total_pages: 0,
      payload_size: 0,
      has_next: false,
      current_page: 0,
      skipped_records: 0,
      total_records: 0
    }
  };

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private crudService: CrudService,
    public localStoreService: LocalStoreService
  ) { }

  ngOnInit(): void {
    this.userListing();
  }

  createUser(user?: any) {
    const initialState = {
      mode: user ? 'update' : 'create',
      userData: user || null,
      userId: user ? user.id : null
    };
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

  userListing(page: number = this.currentPage, search: string = this.searchTerm) {
    const urlData = `users?page=${page}&pageSize=${this.pageSize}&search=${search}`;
    this.crudService.read(urlData).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        if (response.data.payload.length > 0) {
          console.log("here is th response", response.data);
          const column = Object.keys(response.data.payload[0]);
          this.columns = column.filter((col: string) =>
            !['id','roles', 'email_verified', 'permissions', 'timezone', 'username', 'updated_at', 'profile_picture', 'last_name'].includes(col)
          );
          this.userList = response.data.payload;

          this.tableConfig = {
            paginationParams: {
              total_pages: response.data.paginate_options.total_pages,
              payload_size: response.data.paginate_options.payload_size,
              has_next: response.data.paginate_options.has_next,
              current_page: response.data.paginate_options.current_page,
              skipped_records: response.data.paginate_options.skipped_records,
              total_records: response.data.paginate_options.total_records
            }
          };
        }
      }
    }, error => {
      console.error('HTTP error:', error);
    });
  }

  onSearchChange(search: string): void {
    this.searchTerm = search;
    this.userListing(1, this.searchTerm);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.userListing(this.currentPage, this.searchTerm);
  }

  viewUserDetail(user: any) {
    this.router.navigate(['/user-detail', user.id]);
  }

  setActive(menu: string): void {
    this.activeMenu = menu;
  }
}
