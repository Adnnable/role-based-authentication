import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (!this.auth.isSuperAdmin) {
      this.router.navigate(['/home']);
      return false;
    }

    if (localStorage.getItem('user')) {
      if (location.href === 'http://localhost:4200/home/summary') {
        if (localStorage.getItem('user')) {
          if (localStorage.getItem('user') === 'admin@localhost') {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
