import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class CreateOrganizationComponent implements OnInit, AfterViewInit {
  @Output() successCall = new EventEmitter();
  @Input() itemList: any;
  @Input() organizationId: number = 0;
  @Input() title: string = '';
  isLoading: boolean = false;
  isFocused: boolean = false;
  organizationForm!: FormGroup;

  constructor(
    private bsModeService: BsModalService,
    private fb: FormBuilder,
    private crudService: CrudService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit(): void { }

  initialize() {
    this.organizationForm = this.fb.group({
      name: ['', [Validators.required]],
      domain: ['', [Validators.required, Validators.pattern(/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i)]],
      status: [this.title === 'Edit' ? '' : { value: '', disabled: true }, [Validators.required]]
    });

    if (this.title === 'Edit' && this.itemList && typeof this.itemList === 'object') {
      this.organizationForm.patchValue({
        name: this.itemList.name,
        domain: this.itemList.domain,
        status: this.itemList.status
      });
    }
  }

  get domainControl() {
    return this.organizationForm.get('domain');
  }

  domainValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // Don't validate empty values
      }

      const domainPattern = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
      const isValidDomain = domainPattern.test(control.value);

      return isValidDomain ? null : { invalidDomain: 'Please enter a valid domain name' };
    };
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.organizationForm.controls[controlName];
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  closeModal() {
    this.bsModeService.hide();
  }

  onSubmit() {
    if (this.organizationForm.invalid) {
      this.organizationForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const formData = this.organizationForm.value;

    if (this.title === 'Create') {
      this.crudService.create('organization', formData).subscribe((response: any) => {
        if (response.status_code === 200 || response.status_code === 201) {
          this.toast.success(response.message, "Success!");
          this.router.navigate(['/layout/organization/details/' + response.data.id]);
          this.closeModal();
        } else {
          this.toast.error(response.message, "Error!");
        }
        this.isLoading = false;
      }, error => {
        this.toast.error(error.error.message, "Error!");
        this.isLoading = false;
      });
    } else if (this.title === 'Edit') {
      this.crudService.update('organization', this.organizationId, formData).subscribe((response: any) => {
        if (response.status_code === 200 || response.status_code === 201) {
          this.toast.success(response.message, "Success!");
          this.successCall.emit();
          this.closeModal();
        } else {
          this.toast.error(response.message, "Error!");
        }
        this.isLoading = false;
      }, error => {
        this.toast.error(error.message, "Error!");
        this.isLoading = false;
      });
    }
  }
}
