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
  autoLogoutTimeout: any;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(data: SignUpData): Observable<AuthResponse> {
    const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    return this.http.post<AuthResponse>(signUpUrl, data).pipe(
      tap((authData) => {
        this.handleAuth(authData, data.firstName, data.lastName);
      })
    );
  }

  saveUserData(data: SignUpData): Observable<any> {
    const url =
      this.apiUrl + 'user-info/' + this.userSubject.getValue()?.id + '.json';
    return this.http.put(url, {
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }

  private handleAuth(
    authData: AuthResponse,
    firstName: string,
    lastName: string
  ): void {
    const tokenExpirationDate = new Date(
      new Date().getTime() + +authData.expiresIn * 1000
    );
    const user = new User(
      firstName,
      lastName,
      authData.email,
      authData.localId,
      authData.idToken,
      tokenExpirationDate
    );
    this.userSubject.next(user);
    localStorage.setItem('auth', JSON.stringify(user));
    this.autoLogOut(tokenExpirationDate.getTime());
  }
  private autoLogOut(time: number): void {
    this.autoLogoutTimeout = setTimeout(() => this.logOut(), time);
  }
  logOut(): void {
    localStorage.removeItem('auth');
    this.userSubject.next(null);
    this.router.navigate(['/log-in']);
  }
}
