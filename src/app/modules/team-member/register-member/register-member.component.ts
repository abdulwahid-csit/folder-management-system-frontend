import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.scss']
})
export class RegisterMemberComponent implements OnInit {


  selectedTab = '';
  modalRef: BsModalRef | undefined;
  modalOpen: boolean | undefined;
  registerForm: any;

 user = [
  {firstName: 'Abdul Basit',
  last: 'basit',
  username: 'Basit',
  phoneNumber: '03432332454',
  email: 'me@domain.com',
  role: 'admin'
  }
 ]

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  setSelectedTab(tab: string){
    this.selectedTab = tab;
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
    class: 'modal-dialog modal-dialog-centered invite-admin-moda modal-lg',
    backdrop: 'static',
    keyboard: false,
    
    });
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalRef?.hide();
    this.modalOpen = false;
  }

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.registerForm?.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  onSubmit(){

    this.registerForm.markAllAsTouched();
    if(this.registerForm.invalid){
      return;
    }
    console.log('Form Submitted');
  }



}
