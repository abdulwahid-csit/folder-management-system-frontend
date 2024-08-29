import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from '../../../shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-invite-member',
  templateUrl: './invite-member.component.html',
  styleUrls: ['./invite-member.component.scss', '../../../css/custpm-dropdown-style.scss']
})


export class InviteMemberComponent implements OnInit {
  inviteForm!: FormGroup;
  roles: any[] = [];
  organization: any[] = [];
  isFocused: boolean = false;
  isLoading: boolean = false;

  constructor(
    private bsModalService: BsModalService,
    private crudService: CrudService,
    private toast: ToastrService,
    public localStoreService: LocalStoreService
  ) { }

  ngOnInit(): void {
    this.initialize();
    this.fetchRoles();

    if (this.localStoreService.getUserRole().toLowerCase() === 'master') {
      this.fetchOrganization();
    }
  }

  initialize() {
    this.inviteForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl(null, [Validators.required]),
      organization: new FormControl(null, [Validators.required])
    });
  }


  fetchRoles(): void {
    this.crudService.create('access/roles/invite-member', {})
      .subscribe(
        response => {
          console.log(response)
          this.roles = response.data;
        },
        error => {
          console.log(error, "Error!")
        }
      );
         
    // this.crudService.read('access/roles')
    //   .subscribe(
    //     (response) => {
    //       this.roles = response.data.payload
    //     },
    //     error => {
    //       console.error('Error fetching roles:', error);
    //     }
    //   );
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

  closeModal(): void {
    this.bsModalService?.hide();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.inviteForm.controls[controlName];
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.localStoreService.getUserRole().toLowerCase() !== 'master') {
      this.inviteForm.patchValue({
        organization: this.localStoreService.getUserOrganization()
      });
    }

    if (this.inviteForm.invalid) {
      this.inviteForm.markAllAsTouched();
      return;
    }

    const formData = this.inviteForm.value;


    const invitationData = {
      ...formData,
      path: '/confirm/',
    };
    this.isLoading = true;
    this.crudService.create('auth/invite', invitationData)
      .subscribe(
        response => {
          this.toast.success(response.message, "Success!")
          this.isLoading = false;
          this.closeModal();
        },
        error => {
          this.toast.error(error.error.message, "Error!")
          this.isLoading = false;
        }
      );

  }

  onValueChange(): void {
    const control = this.inviteForm.get('role');
    if (control?.value) {
      this.isFocused = false;
    }
  }
  onChange(): void {
    const control = this.inviteForm.get('organization');
    if (control?.value) {
      this.isFocused = false;
    }
  }
}
