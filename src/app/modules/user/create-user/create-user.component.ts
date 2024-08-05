import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  @Input() mode: 'create' | 'update' = 'create';
  @Input() userData: any;
  constructor(private bsModalService: BsModalService, private fb: FormBuilder,) {

  }
  userForm!: FormGroup
  isPasswordVisible: boolean = false;
  ngOnInit(): void {
    if (this.mode === 'update' && this.userData) {
      this.userForm.patchValue(this.userData);
      this.userForm.removeControl('password'); // Remove password field for update
    }
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

  closeModal() {
    this.bsModalService.hide()
  }
  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.mode === 'create') {
      } else if (this.mode === 'update') {
      }
    }
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {

      return;
    }
    console.log(this.userForm.value);
    this.bsModalService.hide();
  }
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
