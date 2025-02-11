import { CrudService } from 'src/app/shared/services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-application',
  templateUrl: './update-application.component.html',
  styleUrls: ['./update-application.component.scss']
})
export class UpdateApplicationComponent implements OnInit {
  receivedID: any | undefined;
  applicationId: any;
  inputUris: Array<{value: string}> = [];
  constructor(private bsModeService: BsModalService, private fb: FormBuilder,
    private crudService: CrudService, private route: ActivatedRoute,
  ) { }
  applicationForm!: FormGroup

  ngOnInit(): void {
    console.log('Received application ID:', this.applicationId);
    // this.route.params.subscribe(params => {
    //   this.applicatonId = params['id'];
    //   console.log("here is the id ",this.applicatonId);
    // });
    this.receivedID = this.applicationId
    this.applicationForm = new FormGroup({
      appName: new FormControl('', [Validators.required]),
      appUrl: new FormControl('', [Validators.required]),
      redirectUri: new FormArray([new FormControl('')]),
      // redirectUri: new FormControl ([],)
    })
  }

  ngAfterViewInit(): void {

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

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.applicationForm.controls[controlName];
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
    const formData = this.applicationForm.value

    if(!this.applicationForm.valid){
      this.applicationForm.markAllAsTouched();
      return;
    }
      this.crudService.update('applications', this.receivedID ,formData).subscribe((response: any) => {

        if (response.status_code === 200 || response.status_code === 201) {
          if (response.data && typeof response.data === 'object') {
            console.log("Data updated");
            // const column = Object.keys(response.data);
            // this.columns = column.filter((column: string) => column !== 'id' && column !== 'logo');
            // this.organizationData = response.data;
            // this.organizationStatus = response.data.status;
          }
        }
      }, error => {
        console.error('HTTP error:', error);
      });

    console.log("Organization created.")
    this.closeModal();
  }

}
