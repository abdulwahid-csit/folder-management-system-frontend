import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
accountDetailsForm!: FormGroup
selectedTab = 'account';
changePasswordForm!: FormGroup;



constructor() { }

  ngOnInit() {
    this.accountDetailsForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('johonysmith@domain.com'),
      role: new FormControl('Admin'),
    })


    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
  }




  setSelectedTab(tab: string){
    this.selectedTab = tab;
  }


  isControlHasError(controlName: any, validationType: string, form: any): boolean {
    const control = form?.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }


  onAccountDetailsSubmit(){
    if(this.accountDetailsForm.invalid){
      this.accountDetailsForm.markAllAsTouched();
      let email = this.accountDetailsForm.controls?.['email'].value;
      email = 'Abdulwahid@gmail.com'
      return;
    }
    console.log("Form Submitted");
  }


  onChangePasswordSubmit(){
    if(this.changePasswordForm.invalid){
      this.changePasswordForm.markAllAsTouched();
      return;
    };
    console.log("Form Submitted.")
  }

}
