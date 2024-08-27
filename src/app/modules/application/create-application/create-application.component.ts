import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';

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


  constructor(private modalService: BsModalService,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.applicationForm = new FormGroup({
      app_name: new FormControl('', [Validators.required]),
      url: new FormControl(''),
      organization: new FormControl('0', [Validators.required, Validators.pattern('^[0-9]+$')]),
      redirectUri: new FormArray([this.createUriGroup()]),
      // redirectUri: new FormControl(''),
    })
  }
  createUriGroup(): FormGroup {
    return new FormGroup({
      uri1: new FormControl(''),
      uri2: new FormControl('')
    });
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

removeInputUri(index: number) {
  this.redirectUriArray.removeAt(index);
}
  submitForm() {
    console.log("here is the value", this.applicationForm.value);

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
