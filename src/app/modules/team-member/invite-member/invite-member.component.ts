import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from '../../../shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invite-member',
  templateUrl: './invite-member.component.html',
  styleUrls: ['./invite-member.component.scss', '../../../css/custpm-dropdown-style.scss']
})


export class InviteMemberComponent implements OnInit {
  inviteForm!: FormGroup;
  roles: any[] = [];
  isFocused: boolean = false;
  isLoading: boolean = false;

  constructor(
    private bsModalService: BsModalService,
    private crudService: CrudService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initialize();
    this.fetchRoles();
  }

  initialize(){
    this.inviteForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl(null, [Validators.required])
    });
  }

  fetchRoles(): void {
    this.crudService.read('access/roles')
      .subscribe(
        (response) => {
          this.roles = response.data.payload
          // console.log("here is the data of APi", this.roles);
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
    if (this.inviteForm.invalid) {
      this.inviteForm.markAllAsTouched();
      return;
    }

    const formData = this.inviteForm.value;


    const invitationData = {
      ...formData,
      path: '/layout/team-member/register',
      // organization: 2
    };
    this.isLoading = true;

    // console.log('Form Submitted:', invitationData);


    this.crudService.create('auth/invite', invitationData)
      .subscribe(
        response => {
          this.toast.success(response.message, "Success!")
          this.isLoading = false;
          // console.log('Invite sent successfully', response);
          this.closeModal();
        },
        error => {
          this.toast.error(error.error.message, "Error!")
          this.isLoading = false;
          // console.error('Error sending invite:', error);
        }
      );
         
  }

  onValueChange(): void {
    const control = this.inviteForm.get('role');
    if (control?.value) {
      this.isFocused = false;
    }
  }
}
