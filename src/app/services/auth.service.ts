import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStatus: boolean;
  constructor() { this.authStatus = false; }

  public setAuthStatus(status) {
    this.authStatus = status;
  }

  public isAuthenticated(): boolean {
    return this.authStatus;
  }
}
