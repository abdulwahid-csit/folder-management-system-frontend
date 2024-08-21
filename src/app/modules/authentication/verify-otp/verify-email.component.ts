import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  code: any[6] = [null, null, null, null, null, null];

  constructor(private crudservice:CrudService,private router:Router) { }

  ngOnInit() {
  }


  onInputChange(event: any, index: number) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 1) {
      value = value[0];
    }

    this.code[index] = value;
    input.value = value;

    if (value.length === 1 && index < this.code.length - 1) {
      input.nextElementSibling.focus();
    }
  }

  onKeyDown(event: any, index: number) {
    const input = event.target;

    if (event.key === 'Backspace') {
      if (input.value.length === 0 && index > 0) {
        input.previousElementSibling.focus();
        this.code[index - 1] = '';
      }
    }
  }

  verifyAccount() {
    const enteredCode = this.code.join('');

    this.crudservice.create('auth/verify-otp', { code: enteredCode } ).subscribe(
      (response) => {
        console.log("this is the otp", enteredCode);
        this.router.navigate(['/create/password']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
