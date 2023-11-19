import { Injectable } from '@angular/core';
import { UserManager, User, Log } from 'oidc-client';
import { Router } from '@angular/router';

Log.logger = console;
Log.level = Log.DEBUG;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userManager: UserManager;
  public user!: User;

  constructor(private router: Router) { 
    this.userManager = new UserManager({
      authority: 'https://dev-7qvir82wwwaaewg7.us.auth0.com',
      client_id: 'FlencBCJim9VzE07J2bXERUZ6ZRfuyWL',
      redirect_uri: 'http://localhost:4200/callback',
      response_type: 'id_token token',
      scope: 'openid profile',
      filterProtocolClaims: true,
      loadUserInfo: true,
    });

    this.userManager.getUser().then((user) => {
      this.user = user as User;
    });
  }

    login(): void {
      this.userManager.signinRedirect();
    }

    logout(): void {
      this.userManager.signoutRedirect();
    }

    handleCallback(): Promise<User> {
      return this.userManager.signinRedirectCallback().then((user) => {
        this.router.navigate(['/']); // Redirect to home after successful callback
        return user;
      });
    }
  }