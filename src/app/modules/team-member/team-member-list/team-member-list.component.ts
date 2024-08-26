import { Component, OnInit } from '@angular/core';
import { InviteMemberComponent } from '../invite-member/invite-member.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.scss']
})
export class TeamMemberListComponent implements OnInit {
  columns: any[] = [];
  modalRef?: BsModalRef;
  searchTerm: string = '';
  teamMemberList: any[] = [];
  tableConfig: any = {};

  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private modalService: BsModalService,
    private crudService: CrudService,
    public localStoreService: LocalStoreService,
  ) { }

  ngOnInit(): void {
    this.memberListing();
  }

  createMember() {
    this.modalRef = this.modalService.show(InviteMemberComponent, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false
    });

    // Uncomment if you want to reload member list after a successful invitation
    // this.modalRef.content.successCall.subscribe(() => {
    //   this.memberListing();
    // });
  }

  memberListing(page: number = this.currentPage, search: string = this.searchTerm) {
    const url = `member?page=${page}&pageSize=${this.pageSize}&search=${search}`;
    this.crudService.read(url).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        console.log("here is the data", response.data);
        if (response.data.payload.length > 0) {
          const column = Object.keys(response.data.payload[0]);
          this.columns = column.filter((col: string) =>
            !['id', 'email_verified', 'permissions', 'timezone', 'username', 'updated_at', 'profile_picture', 'last_name'].includes(col)
          );
          this.teamMemberList = response.data.payload;

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
    this.currentPage = 1;
    this.memberListing(this.currentPage, this.searchTerm);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.memberListing(this.currentPage, this.searchTerm);
  }
}
