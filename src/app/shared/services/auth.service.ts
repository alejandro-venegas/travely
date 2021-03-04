import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

interface SignUpData {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new BehaviorSubject<User | null>(null);
  apiUrl = environment.apiUrl;
  apiKey = environment.apiKey;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(data: SignUpData): Observable<AuthResponse> {
    const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    return this.http.post<AuthResponse>(signUpUrl, data).pipe(
      tap((authData) => {
        const user = new User(
          authData.email,
          authData.localId,
          authData.idToken,
          new Date(new Date().getTime() + +authData.expiresIn * 1000)
        );
        this.userSubject.next(user);
      })
    );
  }

  saveUserData(data: SignUpData): void {
    const url =
      this.apiUrl + 'user-info/' + this.userSubject.getValue()?.id + '.json';
    this.http
      .put(url, { firstName: data.firstName, lastName: data.lastName })
      .subscribe((res) => {
        this.router.navigate(['/log-in'], { replaceUrl: true });
      });
  }
}
