import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {
  modalRef: any;
  applicationForm!: FormGroup
  modalOpen: boolean = false;
  inputUris: Array<{value: string}> = [];
  @Output() successCall = new EventEmitter();
  organization: any[] = [];
  isFocused: boolean = false;


  constructor(private modalService: BsModalService,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
    public localStoreService: LocalStoreService
  ) { }


  ngOnInit(): void {
    
    if(this.localStoreService.getUserRole().toLowerCase() === 'master'){
      this.fetchOrganization();
    }

    this.applicationForm = new FormGroup({
      app_name: new FormControl('', [Validators.required]),
      url: new FormControl(''),
      organization: new FormControl(null, [Validators.required]),
      // organization: new FormControl('0', [Validators.required, Validators.pattern('^[0-9]+$')]),
      redirectUri: new FormArray([new FormControl('')]),
      // redirectUri: new FormControl(''),
    })
  }

  onChange(): void {
    const control = this.applicationForm.get('organization');
    if (control?.value) {
      this.isFocused = false;
    }
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

get redirectUriArray(): FormArray {
  return this.applicationForm.get('redirectUri') as FormArray;
}


addInputUri() {
  this.redirectUriArray.push(new FormControl(''));
}
resetInputs(): void {
  this.redirectUriArray.clear();
  this.inputUris = [];
  this.addInputUri();
}
fetchOrganization(): void {
  this.crudService.read('organization')
    .subscribe(
      (response) => {
        this.organization = response.data.payload
      },
      error => {
        console.error('Error fetching roles:', error);
      }
    );
}
removeInputUri(index: number) {
  this.redirectUriArray.removeAt(index);
}
  submitForm() {
    if(this.localStoreService.getUserRole().toLowerCase() !== 'master'){
      this.applicationForm.patchValue({
        organization: this.localStoreService.getUserOrganization()
      });
    }

    const createData = this.applicationForm.value;
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }
    else {
      this.crudService.create('applications',createData).subscribe((response: any) => {
        if (response.status_code === 200 || response.status_code === 201) {
          if (response.data && typeof response.data === 'object') {
            this.successCall.emit()
          }
        }
      }, error => {
        console.error('HTTP error:', error);
      });
    }




    this.closeModal();
  }


}
