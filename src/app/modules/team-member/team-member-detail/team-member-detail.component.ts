import { Component, OnInit, TemplateRef } from '@angular/core';
import { UpdateTeamMemberComponent } from '../update-team-member/update-team-member.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-member-detail',
  templateUrl: './team-member-detail.component.html',
  styleUrls: ['./team-member-detail.component.scss']
})
export class TeamMemberDetailComponent implements OnInit{

  user = [
    {
      firstName: 'Abdul Basit',
      last: 'basit',
      username: 'Basit',
      phoneNumber: '03432332454',
      email: 'me@domain.com',
      role: 'admin',
      status: 'Inactive'
    }
  ]
  modalRef: any;
  changePasswordForm: any;

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  constructor(private modalService: BsModalService) { }

  openModal( classes: string, templateRef?: any) {
    if(templateRef){
      this.modalRef = this.modalService.show(templateRef, {
        class: classes,
        backdrop: 'static',
        keyboard: false,
        // initialState,
      });
    }else{
      this.modalRef = this.modalService.show(UpdateTeamMemberComponent, {
        class: classes,
        backdrop: 'static',
        keyboard: false,
        // initialState,
      });
    }
  }

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.changePasswordForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  closeModal(){
    this.modalRef.hide();
  }




}
