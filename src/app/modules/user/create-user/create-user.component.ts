import {  Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,  } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  
  

  constructor(private bsModalService: BsModalService, private fb: FormBuilder,)
  { 
    

 }
  userForm!:FormGroup
isPasswordVisible = false;
  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
       userName: [null, Validators.compose([Validators.required])],
      domainName: [null, Validators.compose([Validators.required])],
       phoneName: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
       password: [null, Validators.compose([Validators.required])],
      role: [null, Validators.compose([Validators.required])],
    })
  }

  ngAfterViewInit(): void {
    
  }

   isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.userForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  closeModal(){
    this.bsModalService.hide()
  }
  onSubmit(): void {
    // Mark all controls as touched to show validation messages
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      // Form is invalid, so do not proceed
      return;
    }

    // Handle form submission
    console.log(this.userForm.value);

    // Close modal
    this.bsModalService.hide();
  }
    togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
