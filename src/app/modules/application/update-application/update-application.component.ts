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
  applicatonId: any | undefined;
  constructor(private bsModeService: BsModalService, private fb: FormBuilder,
    private crudService: CrudService, private route: ActivatedRoute,
  ) { }
  applicationForm!: FormGroup

  ngOnInit(): void {
    this.applicationForm = new FormGroup({
      appName: new FormControl('', [Validators.required]),
      appUrl: new FormControl('', [Validators.required]),
      redirectUri: new FormArray([new FormControl('')]),
    })
  }

  ngAfterViewInit(): void {

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
    // this.route.paramMap.subscribe(params => {
    //   const idParam = params.get('id');
    //   if (idParam) {
    //     this.applicatonId = 12
    //   }
    // });
    this.applicatonId = 12

      this.crudService.update('applications', this.applicatonId ,formData).subscribe((response: any) => {
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
