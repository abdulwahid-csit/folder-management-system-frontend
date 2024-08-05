import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-invite-member',
  templateUrl: './invite-member.component.html',
  styleUrls: ['./invite-member.component.scss']
})
export class InviteMemberComponent implements OnInit {
  inviteForm: any;
  modalRef: any;
  roles = ['Admin', 'Moderator', 'Visitor', 'New Role'];
  selectedRole: any;


  constructor(private bsModalService: BsModalService) { }

  ngOnInit(): void {

    this.inviteForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    })
  }

  closeModal(): void {
    this.bsModalService?.hide();
  }

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.inviteForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }


  onSubmit() {
    console.log("Form Submitted.")
  }

}
