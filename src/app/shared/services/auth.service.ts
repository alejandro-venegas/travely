import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { valueReferenceToExpression } from '@angular/compiler-cli/src/ngtsc/annotations/src/util';

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
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

  private getUserData(authResponse: AuthResponse): Observable<AuthResponse> {
    const url = this.apiUrl + 'user-info/' + authResponse.localId + '.json';
    return this.http.get<{ firstName: string; lastName: string }>(url).pipe(
      tap((userInfo) =>
        this.handleAuth(authResponse, userInfo.firstName, userInfo.lastName)
      ),
      map((value) => authResponse)
    );
  }

  logIn(email: string, password: string): Observable<AuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
    return this.http
      .post<AuthResponse>(url, { email, password, returnSecureToken: true })
      .pipe(concatMap((authResponse) => this.getUserData(authResponse)));
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
    this.autoLogOut(tokenExpirationDate.getTime() - new Date().getTime());
    this.router.navigate(['/home'], { replaceUrl: true });
  }
  private autoLogOut(time: number): void {
    this.autoLogoutTimeout = setTimeout(() => this.logOut(), time);
  }
  autoLogIn(): void {
    const authString = localStorage.getItem('auth');
    if (authString) {
      const authData = JSON.parse(authString);
      const tokenExpirationDate = new Date(authData._tokenExpirationDate);
      const user = new User(
        authData.firstName,
        authData.lastName,
        authData.email,
        authData.id,
        authData._token,
        tokenExpirationDate
      );
      if (user.token) {
        this.userSubject.next(user);
        const tokenTimeLeft =
          tokenExpirationDate.getTime() - new Date().getTime();
        this.autoLogOut(tokenTimeLeft);
      }
    }
  }
  logOut(): void {
    localStorage.removeItem('auth');
    this.userSubject.next(null);
    this.router.navigate(['/log-in']);
    if (this.autoLogoutTimeout) {
      clearTimeout(this.autoLogoutTimeout);
      this.autoLogoutTimeout = null;
    }
  }
}
