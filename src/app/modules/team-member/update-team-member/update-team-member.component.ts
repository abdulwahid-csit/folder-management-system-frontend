import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-update-team-member',
  templateUrl: './update-team-member.component.html',
  styleUrls: ['./update-team-member.component.css']
})
export class UpdateTeamMemberComponent implements OnInit {

  updateMemberForm: any;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.updateMemberForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }


  onSubmit() {
    console.log("Form submitted.")
  }

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.updateMemberForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  closeModal() {
    this.modalService.hide();
  }

}
