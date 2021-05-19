import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { finalize } from 'rxjs/operators';
import { LoadingSpinnerService } from '../../shared/services/loading-spinner.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.loadingSpinnerService.toggleLoadingSpinner();
      this.authService
        .logIn(form.value.email, form.value.password)
        .pipe(finalize(() => this.loadingSpinnerService.toggleLoadingSpinner()))
        .subscribe(
          (res) => console.log(res),
          (error) => {
            console.log(error);
            switch (error.error.error.message) {
              case 'EMAIL_NOT_FOUND':
                this.errorMsg = 'Invalid email or password';
                break;
            }
          }
        );
    } else {
      form.form.markAllAsTouched();
    }
  }
}
