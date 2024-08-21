import { Component, OnInit } from '@angular/core';
import { InviteMemberComponent } from '../invite-member/invite-member.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';



@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.scss']
})
export class TeamMemberListComponent implements OnInit {
  columns: any = []
  modalRef?: BsModalRef;
  searchTerm: string = '';
  teamMemberList: any[] = [];
  tableConfig: any = {};

  constructor(
    private modalService: BsModalService,
    
    private crudService: CrudService,
  
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
    // this.modalRef.content.successCall.subscribe(() => {
    //   this.memberListing();
    // });
  }

 
  memberListing() {
    this.crudService.read('member').subscribe((response: any) => {
     if (response.status_code === 200 || response.status_code === 201) {
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
