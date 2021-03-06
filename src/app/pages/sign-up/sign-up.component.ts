import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LoadingSpinnerService } from '../../shared/services/loading-spinner.service';
import { catchError, concatMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  usedEmails: string[] = [];
  constructor(
    private authService: AuthService,
    private loadingSpinnerService: LoadingSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.loadingSpinnerService.toggleLoadingSpinner();
      this.authService
        .signUp(form.value)
        .pipe(
          concatMap((value) => {
            return this.authService.saveUserData(form.value);
          }),
          finalize(() => this.loadingSpinnerService.toggleLoadingSpinner())
        )
        .subscribe(
          (authResponse) => {
            console.log(authResponse);
            this.router.navigate(['/log-in'], { replaceUrl: true });
          },
          (error) => {
            switch (error?.error?.error?.message) {
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
