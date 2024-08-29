import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  accountDetailsForm!: FormGroup
  selectedTab = 'account';
  changePasswordForm!: FormGroup;
  organizationForm!: FormGroup;
  matchPassword: boolean = false;
  isLoadingPassword: boolean = false;
  isLoadingAccount: boolean = false;
  isLoadingOrganization: boolean = false;
  organizationData: any = {};

  constructor(
    public localStoreService: LocalStoreService,
    private fb: FormBuilder,
    private crudService: CrudService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    
    this.accountDetailsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: [''],
    })

    const data = this.localStoreService.getItem('user');
    if(typeof data === 'object'){
      this.organizationData = data.organization;
      
      this.accountDetailsForm.patchValue({
        firstName: data.first_name,
        lastName: data.last_name,
        username: data.username,
        phoneNumber: data.phone_number || '',
        email: data.email,
        role: data.role.name || '',
      })
      
      if(this.localStoreService.getUserRole().toLowerCase() === 'owner'){

        this.organizationForm = this.fb.group({
          name: ['', [Validators.required]],
          domain: ['', [Validators.required]],
        })
          
        this.organizationForm.patchValue({
          name: data.organization.name,
          domain: data.organization.domain,
        })
      }
    }

    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })
  }


  setSelectedTab(tab: string){
    this.selectedTab = tab;
  }


  isControlHasError(controlName: any, validationType: string, form: any): boolean {
    const control = form?.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }


  onAccountDetailsSubmit(){
    if(this.accountDetailsForm.invalid){
      this.accountDetailsForm.markAllAsTouched();
      return;
    }
    this.isLoadingAccount = true;
    this.accountDetailsForm.removeControl('role');
    this.crudService.update('member', this.localStoreService.getUserId(), this.accountDetailsForm.value).subscribe(response => {
      this.toast.success(response.message, "Success!");
      this.updateLocalStorage(this.accountDetailsForm.value);
      this.isLoadingAccount = false;
    }, error => {
      this.toast.error(error.message, "Error!");
      this.isLoadingAccount = false;
    });
    this.accountDetailsForm.addControl('role', this.fb.control(this.localStoreService.getUserRole(), Validators.required));
  }

  updateLocalStorage(data: { firstName: string, lastName: string, username: string, phoneNumber?: string }): void {
    const user = this.localStoreService.getItem('user');

    if (user) {
      user.first_name = data.firstName;
      user.last_name = data.lastName;
      user.username = data.username;
      user.phone_number = data.phoneNumber || '';

      this.localStoreService.setItem('user', user);
    } else {
      console.warn('User not found in localStorage');
    }
  }

  onChangePasswordSubmit(){
    if(this.changePasswordForm.invalid){
      this.changePasswordForm.markAllAsTouched();
      return;
    };
    if(this.changePasswordForm.get('newPassword')?.value  !== this.changePasswordForm.get('confirmPassword')?.value){
      this.matchPassword = true;
      return
    }

    this.matchPassword = false;
    this.isLoadingPassword = true;
    var dataChangePassword = this.changePasswordForm.get('confirmPassword')?.value;
    this.changePasswordForm.removeControl('confirmPassword');

    this.crudService.update('auth/change-password', this.localStoreService.getUserId(),this.changePasswordForm.value).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        this.toast.success(response.message, "Success!")
        this.changePasswordForm.addControl('confirmPassword', this.fb.control('', Validators.required));
        this.changePasswordForm.reset();
      } else {
        this.toast.error(response.message, "Error!");
      }
      this.isLoadingPassword = false;
    }, error => {
      this.changePasswordForm.addControl('confirmPassword', this.fb.control(dataChangePassword, Validators.required));
      this.toast.error(error.message, "Error!");
      this.isLoadingPassword = false;
    });

  }

  onOrganizationSubmit(){
    if(this.organizationForm.invalid){
      this.organizationForm.markAllAsTouched();
      return;
    };

    this.isLoadingOrganization = true;

    this.crudService.update('organization', this.organizationData.id,this.organizationForm.value).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        this.toast.success(response.message, "Success!")
      } else {
        this.toast.error(response.message, "Error!");
      }
      this.isLoadingOrganization = false;
    }, error => {
      this.toast.error(error.message, "Error!");
      this.isLoadingOrganization = false;
    });
  }

}
