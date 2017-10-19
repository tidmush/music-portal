import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Settings} from '../settings';
import { LoginDetails } from '../models/login-details';
import {GeneralService} from '../main/general.service';

@Injectable()
export class LoginService {
    private token: string;
    
    constructor(private http: Http, private settings: Settings, private generalService: GeneralService) { }
    
    isAuthorized(): Promise<boolean> {
        return this.getSession()
            .then(key => Promise.resolve(true))
            .catch(err => Promise.resolve(false));
    }


    getToken(): Promise<string> {
        let url = this.generalService.generateApiUrl({ api_key: this.settings.lastfm.apiKey, method: 'auth.getToken' }, null);

        return this.http.get(url)
            .toPromise()
            .then(response => {
                this.token = response.json().token as string;
                console.log('token:', this.token);
                return this.token;
            })
            .catch(error => {
                console.error("get token error: ", error);
                return Promise.reject(error.message || error);
        });
    }


    getSession(): Promise<string> {
        let loginDetails: LoginDetails = JSON.parse(localStorage.getItem('lastfmlogindetails')) as LoginDetails;
        if (loginDetails && loginDetails.key)
            return Promise.resolve(loginDetails.key);

        if (!this.token)
            return Promise.reject(null);

        let url = this.generalService.generateApiUrl({ api_key: this.settings.lastfm.apiKey, token: this.token, method: 'auth.getSession' }, null);

        return this.http.get(url)
            .toPromise()
            .then(response => {
                loginDetails = response.json().session as LoginDetails;
                localStorage.setItem('lastfmlogindetails', JSON.stringify(loginDetails));
                return loginDetails.key;
            })
            .catch(error => {
                console.error("get session error: ", error);
                return Promise.reject(error.message || error);
            });
    }
}