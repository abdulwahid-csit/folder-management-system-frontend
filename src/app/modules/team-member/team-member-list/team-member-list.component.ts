import { Component, OnInit } from '@angular/core';
import { InviteMemberComponent } from '../invite-member/invite-member.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.scss']
})
export class TeamMemberListComponent implements OnInit {
  columns: any[] = [
    { name: 'Email' },
    { name: 'Full Name' },
    { name: 'Organization' },
    { name: 'Role' },
    { name: 'Status' },
    { name: 'Creation Date' }
  ];
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

  constructor(private modalService: BsModalService, private authService: AuthService) { }

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

  memberListing() {
    this.authService.getMember().subscribe({
      next: (response: any) => {
        if (response.status_code === 200) {
          console.log('Members listing successful:', response);
          this.teamMemberList = response.data?.payload || [];
          const paginationParams = response.data?.paginationParams || {};
          this.total_pages = paginationParams.total_pages || 0;
          this.payload_size = paginationParams.payload_size || 0;
          this.current_page = paginationParams.current_page || 1;
          this.has_next = paginationParams.has_next || false;
          this.skipped_records = paginationParams.skipped_records || 0;
          this.total_records = paginationParams.total_records || 0;
          this.tableConfig = {
            paginationParams: {
              total_pages: this.total_pages,
              payload_size: this.payload_size,
              has_next: this.has_next,
              current_page: this.current_page,
              skipped_records: this.skipped_records,
              total_records: this.total_records
            }
          };
        } else {
          console.error('Member listing failed:', response.message);
        }
      },
      error: (error) => {
        console.error('HTTP error:', error);
      }
    });
  }
}
