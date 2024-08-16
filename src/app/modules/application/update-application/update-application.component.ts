import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-update-application',
  templateUrl: './update-application.component.html',
  styleUrls: ['./update-application.component.scss']
})
export class UpdateApplicationComponent implements OnInit {
  constructor(private bsModeService: BsModalService, private fb: FormBuilder,) { }
  organizationForm!: FormGroup

  ngOnInit(): void {
    this.organizationForm = new FormGroup({
      appName: new FormControl('', [Validators.required]),
      appUrl: new FormControl('', [Validators.required]),
      redirectUri: new FormControl('', [Validators.required])
    })
  }

  ngAfterViewInit(): void {

  }

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.organizationForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  closeModal() {
    this.bsModeService.hide()
  }

  onSubmit(){
   
    if(!this.organizationForm.valid){
      this.organizationForm.markAllAsTouched();
      return;
    }
    console.log("Organization created.")
    this.closeModal();
  }
}
