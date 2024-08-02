import {  Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,  } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  
  form: FormGroup;

  constructor(private bsModeService: BsModalService, private fb: FormBuilder,)
  { 
    
    this.form = this.fb.group({
      garnishment_type: [null, Validators.required]
    });
 }
  userForm!:FormGroup

  ngOnInit(): void {
    this.userForm = new FormGroup({
      organizationName: new FormControl('', [Validators.required]),
      domainName: new FormControl('', [Validators.required])
    })
  }

  ngAfterViewInit(): void {
    
  }

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.userForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  closeModal(){
    this.bsModeService.hide()
  }
}
