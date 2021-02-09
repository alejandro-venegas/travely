import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  usedEmails: string[] = [];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.signUp(form.value).subscribe(
        (authResponse) => {
          console.log(authResponse);
        },
        (error) => {
          switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
              this.usedEmails.push(form.value.email);
              form.controls.email.updateValueAndValidity();
              break;
          }
          form.form.markAllAsTouched();
        }
      );
    } else {
      form.form.markAllAsTouched();
    }
  }
}
