import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { PageVisitTrackerService } from 'src/app/page-visit-tracker.service';
import { user } from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = new user();
  constructor(
    private route: Router,
    private auth: AuthService,
    private pageVisitTracker: PageVisitTrackerService
  ) {}

  onInit() {}

  onSubmit(username: string, password: string) {
    
    this.user.username = username;
    this.user.password = password;
    console.log(
      'user details: ' +
        this.user.username +
        this.user.password +
        this.user +
        'user'
    );
    this.auth.login(this.user.username, this.user.password);

    this.invokeVisitTracker();
  }

  invokeVisitTracker() {
    let _role = 'member';

    if (this.auth.isSuperAdmin()) {
      _role = 'admin';
    }

    const userData = { role: _role, username: this.user.username };
    this.pageVisitTracker.trackPageVisit(userData);
  }
}
