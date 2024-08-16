import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UpdateTeamMemberComponent } from '../update-team-member/update-team-member.component';

@Component({
  selector: 'app-team-member-detail',
  templateUrl: './team-member-detail.component.html',
  styleUrls: ['./team-member-detail.component.scss']
})
export class TeamMemberDetailComponent implements OnInit {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  modalRef: any;
  changePasswordForm: any;
  id: number | null = null;
  user: any; 

  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      console.log('ID from URL:', this.id);
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
          console.warn(response);
          this.user = response; 
          console.warn(this.user, 'user data');
          
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
      data: this.user.data // Pass the memberId to the modal component
    }
    this.modalRef = this.modalService.show(UpdateTeamMemberComponent, {
      class: classes,
      backdrop: 'static',
      keyboard: false,
      initialState
    });
  
  }
  deleteModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,

    });
    
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
