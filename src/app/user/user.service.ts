import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Settings} from '../settings';
import { LoginService } from '../login/login.service';
import {UserCollection} from '../models/user-collection';
import { LoginDetails } from '../models/login-details';
import { GeneralService } from '../main/general.service';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private settings: Settings, private generalService: GeneralService) { }

    // getUserDetails(): Observable<User> {
    //     let url = this.generalService.generateApiUrl({ api_key: this.settings.lastfm.apiKey, method: 'user.getInfo' }, null);

    //     return this.http.get(url)
    //         .subscribe(
    //         response => response.json() as User,
    //         err => console.error(err)
    // }

    // getTopArtists(period: string, limit: number, page: number): Promise<Artist[]> {
    //     let loginDetails = JSON.parse(localStorage.getItem('lastfmlogindetails')) as LoginDetails
    //     if (!loginDetails)
    //         Promise.reject(null);

    //     let request = { api_key: this.settings.lastfm.apiKey, method: 'user.getTopArtists', user: loginDetails.name };

    //     let url = this.generalService.generateApiUrl(request, null);
    //     return this.http.get(url)
    //         .toPromise()
    //         .then(response => response.json() as Artist[])
    //         .catch(error => console.error("get top artists: ", error));
    // }

    getTracks(type: string, period: string, limit: number, page: number): Observable<UserCollection> {
        let loginDetails = JSON.parse(localStorage.getItem('lastfmlogindetails')) as LoginDetails
        if (!loginDetails)
            Promise.reject(null);

        let request = { api_key: this.settings.lastfm.apiKey, method: 'user.get' + type, user: loginDetails.name };

        let url = this.generalService.generateApiUrl(request, null);
        return this.http.get<UserCollection>(url);  
    }
}