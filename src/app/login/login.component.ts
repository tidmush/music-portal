import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Settings} from '../settings';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.template.html',
})
export class LoginComponent implements OnInit {
  constructor(private settings: Settings, private loginService: LoginService, private router: Router) { }

  lastfmLoginUrl: string = this.settings.lastfm.authUrl;
  isLoggedIn: boolean = false;
  token: string;



  ngOnInit(): void {
    //check if login service has a token and a session key
    this.loginService.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        this.router.navigate(['/']);
      }
      else {
        //get token
        this.loginService.getToken().then(token => {
          //try get session from api
          this.loginService.getSession().then(sessionKey => {
            if (sessionKey) {
              this.router.navigate(['/']);
            }           
          }).catch(error => {            
              this.token = token;
              this.lastfmLoginUrl += "/?api_key=" + this.settings.lastfm.apiKey + "&token=" + token;            
          });
        });
      }
    });
  }

  waitForSessionKey(): void {
    let loginCheck = setInterval(() => {
      this.loginService.getSession()
        .then(session => {
          clearInterval(loginCheck);
          this.router.navigate(['/']);
        }
        ).catch(err => console.log('get ssesion mistake', err));
    }, 1500)
  }
}
