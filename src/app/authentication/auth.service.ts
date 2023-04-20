import { Injectable } from '@angular/core';
import { user } from '../user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { PageVisitTrackerService } from '../page-visit-tracker.service';

let users = [
  new user('admin@localhost', 'admin@12345678'),
  new user('user1@localhost', 'user1@12345678'),
  new user('user2@localhost', 'user2@12345678'),
];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  showBtn: boolean = true;
  user = new user();
  userType: BehaviorSubject<string> = new BehaviorSubject<any>(
    this.getUserType()
  );

  constructor(
    private _router: Router,
    private pageVisitTracker: PageVisitTrackerService
  ) {}

  getUserType() {
    return localStorage.getItem('user');
  }

 

  isSuperAdmin() {
    if (localStorage.getItem('user') === 'admin@localhost') {
      return true;
    } else {
      return false;
    }
  }

  login(username: string, password: string): any {
    //debugger
    this.user.username = username;
    this.user.password = password;

    let authenticatedUser = users.find(
      (u) => u.username === this.user.username
    );
    if (authenticatedUser && authenticatedUser.password == this.user.password) {
      localStorage.setItem('user', this.user.username);
      this.showBtn = true;
      this.userType.next(this.user.username);
      this._router.navigate(['/home']);
    } else {
      this.showBtn = false;
      return 'unauth';
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.showBtn = false;
    // this.location.replaceState('/');
    this._router.navigate(['login']);
  }
}
