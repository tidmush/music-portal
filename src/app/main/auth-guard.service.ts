import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../login/login.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


@Injectable()
export class AuthGuard implements CanActivate {
  private isAuthorized: boolean;

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.loginService.isAuthorized()
      .then(res => {
        if (!res)
          this.router.navigate(['/login']);
        return res;
      }).catch(err => {
        this.router.navigate(['/login']);
        return false;
      });
  }
}
