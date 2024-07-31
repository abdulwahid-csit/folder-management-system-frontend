import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,  } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit, AfterViewInit {
  constructor(private bsModeService: BsModalService,private fb:FormBuilder,){ }
  organizationForm!:FormGroup

  ngOnInit(): void {
    this.organizationForm = new FormGroup({
      organizationName: new FormControl('', [Validators.required]),
      domainName: new FormControl('', [Validators.required])
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

  closeModal(){
    this.bsModeService.hide()
  }
}
