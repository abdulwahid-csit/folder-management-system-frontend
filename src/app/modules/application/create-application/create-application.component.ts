import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {
  modalRef: any;
  applicationForm!: FormGroup
  modalOpen: boolean = false;


  constructor(private modalService: BsModalService) { }


  ngOnInit(): void {
    this.applicationForm = new FormGroup({
      applicationName: new FormControl('', [Validators.required]),
      appUrl: new FormControl(''),
      redirectUrl: new FormControl(''),
      url: new FormControl(''),
    })
  }


  closeModal(): void {
    this.modalService.hide();
  }

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.applicationForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  submitForm() {
    this.applicationForm.markAllAsTouched();
    if (!this.applicationForm.valid) {
      return;
    }
    console.log("Form Submitted.")
    this.closeModal();
  }


}
