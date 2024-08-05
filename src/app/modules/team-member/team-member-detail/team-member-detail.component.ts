import { Component } from '@angular/core';
import { UpdateTeamMemberComponent } from '../update-team-member/update-team-member.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-team-member-detail',
  templateUrl: './team-member-detail.component.html',
  styleUrls: ['./team-member-detail.component.scss']
})
export class TeamMemberDetailComponent {

  user = [
    {
      firstName: 'Abdul Basit',
      last: 'basit',
      username: 'Basit',
      phoneNumber: '03432332454',
      email: 'me@domain.com',
      role: 'admin',
      status: 'inActive'
    }
  ]
  modalRef: any;


  constructor(private modalService: BsModalService) { }

  openModal() {
    this.modalRef = this.modalService.show(UpdateTeamMemberComponent, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow modal-lg',
      backdrop: 'static',
      keyboard: false,
      // initialState,
    });
  }

}
