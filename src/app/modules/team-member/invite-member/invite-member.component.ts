import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-invite-member',
  templateUrl: './invite-member.component.html',
  styleUrls: ['./invite-member.component.scss']
})
export class InviteMemberComponent implements OnInit {
  inviteForm: any;
  modalRef: any;
  options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];

  selectedCar: number = 1;

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

  selectedOption: any;


  constructor(private bsModalService: BsModalService) { }

  ngOnInit(): void {

    this.inviteForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    })
  }

  closeModal(): void {
    this.bsModalService?.hide();
  }

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.inviteForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }


  onSubmit() {
    console.log("Form Submitted.")
  }

}
