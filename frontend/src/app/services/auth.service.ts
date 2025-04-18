import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface AuthResponse {
  user: {
    id: string;
    username: string;
  },
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'api';
  private authErrorsSubject = new BehaviorSubject<string[]>([]);
  authErrors$ = this.authErrorsSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, {
      user: { username, password }
    }).pipe(
      tap(response => {
        this.storeAuthData(response)
      }), catchError(this.handleError.bind(this))
    );
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/logout`).pipe(
      tap(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      })
    );
  }

  signup(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/users`, {
      user: { username, password }
    }).pipe(
      tap(response => {
        this.storeAuthData(response)
      }), catchError(this.handleError.bind(this))
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 422 && error.error && error.error.errors) {
      const errorMessages = error.error.errors;
      // console.error(errorMessages);
      console.log(`this: ${error}`);
      this.authErrorsSubject.next(errorMessages);
    } else {
      this.authErrorsSubject.next(['An unexpected error occurred. Please try again.']);
    }
    return throwError(() => error);
  }

  clearErrors() {
    this.authErrorsSubject.next([]);
  }

  private storeAuthData(response: AuthResponse): void {
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user_data', JSON.stringify(response.user));
  }
}
