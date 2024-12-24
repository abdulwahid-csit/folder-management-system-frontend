import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss', '../../../css/custpm-dropdown-style.scss']
})
export class CreateApplicationComponent implements OnInit {
  modalRef: any;
  applicationForm!: FormGroup;
  modalOpen: boolean = false;
  inputUris: Array<{ value: string }> = [];
  @Output() successCall = new EventEmitter();
  organization: any[] = [];
  isFocused: boolean = false;
  @Input() itemList: any;
  @Input() organizationId: number | undefined;
  @Input() title: string = '';
  isLoading: boolean = false;
  applicationID: any;
  isRedirectUriInvalid!: boolean;

  constructor(
    private modalService: BsModalService,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    public localStoreService: LocalStoreService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {

    this.isRedirectUriInvalid = this.title == 'Edit' ? false : true;
    if (this.localStoreService.getUserRole().toLowerCase() === 'master') {
      this.fetchOrganization();
    }
    this.initialize();
  }

  get redirectUri(): FormArray {
    return this.applicationForm.get('redirectUri') as FormArray;
  }

  createUriField(): FormGroup {
    return this.fb.group({
      uri: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(https?:\/\/)?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(\/.*)?$/i)
        ]
      ]
    });
  }

  addInputUri(): void {
    this.isRedirectUriInvalid = true;
    this.redirectUri.push(this.createUriField());
  }

  removeInputUri(index: number): void {
    this.redirectUri.removeAt(index);
  }

  onUriInputChange(index: number): void {
    const control = this.redirectUri.at(index).get('uri');
    if (control?.invalid) {
      this.isRedirectUriInvalid = true;
    }else{
      this.isRedirectUriInvalid = false;
    }
  }

  onChange(): void {
    const control = this.applicationForm.get('organization');
    if (control?.value) {
      this.isFocused = false;
    }
  }

  initialize() {
    this.applicationForm = new FormGroup({
      app_name: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required, Validators.pattern(/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i)]),
      organization: new FormControl('', [Validators.required]),
      redirectUri: this.fb.array([this.createUriField()]),
    });

    if (this.itemList && typeof this.itemList === 'object') {
      this.applicationForm.patchValue({
        app_name: this.itemList.app_name,
        url: this.itemList.url,
        organization: this.itemList.organization.id
      });

      const redirectUriArray = this.applicationForm.get('redirectUri') as FormArray;

      redirectUriArray.clear();

      if (this.itemList.redirect_uri && Array.isArray(this.itemList.redirect_uri)) {
        this.itemList.redirect_uri.forEach((uri: any) => {
          redirectUriArray.push(this.fb.group({ uri: [uri, [Validators.pattern(/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i)]] }));
        });
      }
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

  fetchOrganization(): void {
    this.crudService.read('organization')
      .subscribe(
        (response) => {
          this.organization = response.data.payload;
        },
        error => {
          console.error('Error fetching roles:', error);
        }
      );
  }

  onSubmit() {
    if (this.localStoreService.getUserRole().toLowerCase() !== 'master') {
      this.applicationForm.patchValue({
        organization: this.localStoreService.getUserOrganization()
      });
    }

    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const createData = this.applicationForm.value;
    const cleanedRedirectUris = createData.redirectUri
      .filter((uriObj: { uri: string }) => uriObj.uri.trim() !== '')
      .map((uriObj: { uri: string }) => uriObj.uri);
    const cleanedFormData = {
      ...createData,
      redirectUri: cleanedRedirectUris
    };

    if (this.title === 'Create') {
      this.crudService.create('applications', cleanedFormData).subscribe(
        (response: any) => {
          if (response.status_code === 200 || response.status_code === 201) {
            this.toast.success(response.message, "Success!");
            if (response.data && typeof response.data === 'object') {
              this.router.navigate(['layout/application/details/' + response.data.id]);
              this.successCall.emit();
              this.closeModal();
            }
          }
        },
        error => {
          this.isLoading = false; // Hide loader on error
          this.toast.error(error.message, "Error!");
          console.error('HTTP error:', error);
        },
        () => {
          this.isLoading = false; // Hide loader on complete
        }
      );
    } else if (this.title === 'Edit') {
      this.crudService.update('applications', this.applicationID, cleanedFormData).subscribe(
        (response: any) => {
          if (response.status_code === 200 || response.status_code === 201) {
            this.toast.success(response.message, "Success!");
            this.successCall.emit();
            this.closeModal();
          }
        },
        error => {
          this.isLoading = false; // Hide loader on error
          this.toast.error(error.message, "Error!");
          console.error('HTTP error:', error);
        }
      );
    }
  }
}
