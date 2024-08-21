import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateTeamMemberComponent } from '../update-team-member/update-team-member.component';
import { CrudService } from '../../../shared/services/crud.service';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-team-member-detail',
  templateUrl: './team-member-detail.component.html',
  styleUrls: ['./team-member-detail.component.scss']
})
export class TeamMemberDetailComponent implements OnInit {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  modalRef: any;
  memberStatus: string = '';
  changePasswordForm: any;
  id: number | null = null;
  user: any;
  isFocused!: boolean;
  userIdToDelete?: number;

  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private crudService: CrudService,
    private router: Router,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.memberGetById();
    });

    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  memberGetById() {
    if (this.id) {
      this.authService.getMemberById(this.id).subscribe({
        next: (response: any) => {
          this.user = response;
          this.memberStatus = response.data.status;
        },
        error: (error) => {
          console.error('HTTP error:', error);
        }
      });
    }
  }

  getOrganization(value: any) {
    if (value && typeof value === 'object') {
      return value.name;
    }
    return '';
  }

  getRole(value: any) {
    if (value && typeof value === 'object') {
      return value.name;
    }
    return '';
  }

  openModal(classes: string) {
    const initialState =  {
      data: this.user.data
    }
    this.modalRef = this.modalService.show(UpdateTeamMemberComponent, {
      class: classes,
      backdrop: 'static',
      keyboard: false,
      initialState
    });
    this.modalRef.content.successCall.subscribe(() => {
      this.memberGetById();
    });

  }
  onValueChange() {
    if (!this.user || !this.user.data || !this.user.data.id) {
      console.error('User ID is not available for the update.');
      return;
    }

    const data = {
      status: this.memberStatus
    }

    this.crudService.update('member', this.user.data.id, data).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        this.toast.success(response.message, "Success!");
      } else {
        this.toast.error(response.message, "Error!");
      }
    }, error => {
      this.toast.error(error.error.message, "Error!");
    });
  }


  userDeleteModal(): void {
    this.userIdToDelete = this.user?.data?.id;

    const initialState = {description: 'Please confirm you really want to delete the member. After clicking yes, the member will be deleted permanently.'};
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-dialog-centered custom-delete-user-modal modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState,
    });

    this.modalRef.content.deleteData.subscribe(() => {
      this.confirmDelete();
    });
  }

   confirmDelete(): void {
    if (this.userIdToDelete != null) {
      this.crudService.delete('member', this.userIdToDelete).subscribe(
        () => {
           this.closeModal();
          this.router.navigate(['/layout/team-member']);
        },
        (error) => {
          // console.error('Error deleting user:', error);
          this.toast.error("Error deleting user", "Error!")

        }
      );
    }
  }

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.changePasswordForm.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  closeModal() {
    this.modalService.hide();
  }

  onSubmit() {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.invalid) {
      return;
    }
    console.log("Form Submitted.");
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
