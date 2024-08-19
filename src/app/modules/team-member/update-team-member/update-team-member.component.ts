import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-update-team-member',
  templateUrl: './update-team-member.component.html',
  styleUrls: ['./update-team-member.component.scss']
})
export class UpdateTeamMemberComponent implements OnInit {
  @Output() successCall = new EventEmitter();
  updateMemberForm!: FormGroup;
  @Input() data!: number;
  membereDAta: any;
  _id!: string | number;
  constructor(private modalService: BsModalService, private http: HttpClient,
    private modalRef: BsModalRef, private authService: AuthService) { }

  ngOnInit() {
    // this.data = this.modalRef.content?.id;
    this.updateMemberForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: true })
    });
   
    if (this.data) {
      this.membereDAta = this.data;
      this.loadMemberData(this.data);
      this._id = this.membereDAta.id;
    }
  }

  loadMemberData(data: any): void {
    // this.authService.getMemberById(this.data).subscribe(member => {
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
    if (this.data) { 
      this.authService.getMemberUpdate(this._id, memberData).subscribe(response => {
        console.log('Member updated successfully', response);
        this.successCall.emit();
        this.closeModal();
      }, error => {
        console.error('Error updating member', error);
      });
     
    }
  }

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.updateMemberForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  closeModal() {
    this.modalService.hide();
  }

}
