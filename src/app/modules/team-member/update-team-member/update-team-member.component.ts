import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-update-team-member',
  templateUrl: './update-team-member.component.html',
  styleUrls: ['./update-team-member.component.scss']
})
export class UpdateTeamMemberComponent implements OnInit {
  @Output() successCall = new EventEmitter<void>();
  updateMemberForm!: FormGroup;
  @Input() data!: any;
  memberId!: number;
    
  constructor(
    private modalService: BsModalService, 
    private http: HttpClient,
    private modalRef: BsModalRef,
    private crudService: CrudService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.updateMemberForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: true })
    });

    if (this.data) {
      this.memberId = Number(this.data.id); // Ensure memberId is a number
      this.loadMemberData(this.data);
    }
  }

  loadMemberData(data: any): void {
    this.updateMemberForm.patchValue({
      firstName: data.first_name,
      lastName: data.last_name,
      username: data.username,
      phoneNumber: data.phoneNumber,
      email: data.email
    });
  }

  updateMember(): void {
    if (this.updateMemberForm.invalid) {
      this.updateMemberForm.markAllAsTouched();
      return;
    }

    const memberData = this.updateMemberForm.value;
    if (this.memberId !== undefined) {
      this.crudService.update('member', this.memberId, memberData).subscribe(
        (response: any) => {
          if (response.status_code === 200) {
            this.toast.success(response.message, "Success!");
            this.successCall.emit();
            this.closeModal();
          } else {
            this.toast.error('Error updating member', "Error!");
          }
        },
        error => {
          this.toast.error('Error updating member', "Error!");
        }
      );
    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.updateMemberForm.controls[controlName];
    return control?.hasError(validationType) && (control.dirty || control.touched);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
