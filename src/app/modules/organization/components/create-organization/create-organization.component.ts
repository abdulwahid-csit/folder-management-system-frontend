import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit, AfterViewInit {
  @Output() successCall = new EventEmitter();
  @Input() itemList: any;
  @Input() organizationId: number = 0;
  @Input() title: string = '';

  constructor(
    private bsModeService: BsModalService, 
    private fb: FormBuilder,
    private crudService: CrudService
  ) { }
  organizationForm!: FormGroup

  ngOnInit(): void {
    this.initialize();
  
  }

  ngAfterViewInit(): void {

  }
  
  initialize(){
    this.organizationForm = this.fb.group({
      name: ['', [Validators.required]],
      domain: ['', [Validators.required]],
    });
    
    if (this.itemList && typeof this.itemList === 'object') {
      this.organizationForm.patchValue({
        name: this.itemList.name,
        domain: this.itemList.domain,
      });
    }
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
    if(this.organizationForm.invalid){
      this.organizationForm.markAllAsTouched();
      return;
    }
    if(this.title === 'Create'){
      this.crudService.create('api/v1/organization', this.organizationForm.value).subscribe((response: any) => {
        if (response.status_code === 200 || response.status_code === 201) {
            console.log("Organization created.")
            this.successCall.emit();
            this.closeModal();
        } else {
          console.error('Organization failed:', response.message);
        }
      }, error => {
  
        console.error('HTTP error:', error);
      });
    } else if(this.title === 'Edit'){
      this.crudService.update('api/v1/organization', this.organizationId,this.organizationForm.value).subscribe((response: any) => {
        if (response.status_code === 200 || response.status_code === 201) {
            console.log("Organization updated.");
            this.successCall.emit();
            this.closeModal();
        } else {
          console.error('Organization failed:', response.message);
        }
      }, error => {
  
        console.error('HTTP error:', error);
      });
    }
    
  }
}
