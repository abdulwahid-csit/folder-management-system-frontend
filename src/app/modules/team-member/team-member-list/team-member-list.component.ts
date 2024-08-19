import { Component, OnInit } from '@angular/core';
import { InviteMemberComponent } from '../invite-member/invite-member.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';


@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.scss']
})
export class TeamMemberListComponent implements OnInit {
  columns: any = []
  total_pages = 0;
  payload_size = 0;
  current_page = 1;
  has_next = false;
  skipped_records = 0;
  total_records = 0;
  modalRef?: BsModalRef;
  searchTerm: string = '';
  teamMemberList: any[] = [];
  tableConfig: any = {};

  constructor(
    private modalService: BsModalService,
    
    private crudService: CrudService,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.memberListing();
  }

  createOganization() {
    this.modalRef = this.modalService.show(InviteMemberComponent, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false
    });
  }

  // memberListing() {
  //   this.authService.getMember().subscribe({
  //     next: (response: any) => {
  //       if (response.status_code === 200) {
  //         console.log('Members listing successful:', response);
  //         this.teamMemberList = response.data?.payload || [];
  //         const paginationParams = response.data?.paginationParams || {};
  //         this.total_pages = paginationParams.total_pages || 0;
  //         this.payload_size = paginationParams.payload_size || 0;
  //         this.current_page = paginationParams.current_page || 1;
  //         this.has_next = paginationParams.has_next || false;
  //         this.skipped_records = paginationParams.skipped_records || 0;
  //         this.total_records = paginationParams.total_records || 0;
  //         this.tableConfig = {
  //           paginationParams: {
  //             total_pages: this.total_pages,
  //             payload_size: this.payload_size,
  //             has_next: this.has_next,
  //             current_page: this.current_page,
  //             skipped_records: this.skipped_records,
  //             total_records: this.total_records
  //           }
  //         };
  //       } else {
  //         console.error('Member listing failed:', response.message);
  //       }
  //     },
  //     error: (error) => {
  //       console.error('HTTP error:', error);
  //     }
  //   });
  // }
  memberListing() {
    this.crudService.read('member').subscribe((response: any) => {
      console.log('outside the if   ', response)
      if (response.status_code === 200 || response.status_code === 201) {
        // this.store.dispatch(new AddOrganization(response));
        if (response.data.payload.length > 0) {
          const column = Object.keys(response.data.payload[0]);
          this.columns = column.filter((column: string) => column !== 'id' &&
            column !== 'email_verified' && column !== 'permissions' && column !== 'timezone' &&
            column !== 'username' && column !== 'updated_at' && column !== 'profile_picture' && column !== 'last_name');
          this.teamMemberList = response.data.payload;

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
}
