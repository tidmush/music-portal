import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Settings } from '../settings';
import { LoginService } from '../login/login.service';
import { UserCollection } from '../models/user-collection';
import { LoginDetails } from '../models/login-details';
import { GeneralService } from '../main/general.service';
import { ListItem } from '../models/list-item';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private settings: Settings, private generalService: GeneralService) { }

    getUserTop(type: string, period: string, limit: number, page: number): Observable<UserCollection> {
        let loginDetails = JSON.parse(localStorage.getItem('lastfmlogindetails')) as LoginDetails
        if (!loginDetails)
            Promise.reject(null);

        let request = { api_key: this.settings.lastfm.apiKey, method: 'user.get' + type, user: loginDetails.name };

        let url = this.generalService.generateApiUrl(request, null);
        return this.http.get<UserCollection>(url);
    }

    getTop(type: string, key: string, limit: number, page: number): Observable<ListItem> {
        let request = { api_key: this.settings.lastfm.apiKey, limit: limit, method: type + '.getTopTracks' };
        request[type] = key;
        let url = this.generalService.generateApiUrl(request, null);
        return this.http.get(url)
            .map(
            response => {
                let item: any = response["toptracks"][0];
                let recommandation: ListItem = new ListItem();
                recommandation.id = item.mbid;
                recommandation.name = item.name;
                recommandation.key = item.artist.name + " - " + item.name;
                recommandation.type = type;
                recommandation.image = item.images[0] || "assets/images/defaultTrack.png";
                return recommandation;
            }
            );
    }

    getSimilar(mbid: string, limit: number, page: number): Observable<ListItem[]> {
        let request = { api_key: this.settings.lastfm.apiKey,limit:limit, mbid: mbid, method: 'track.getSimilar'};

        let url = this.generalService.generateApiUrl(request, null);
        return this.http.get(url)
            .map(response => {
                let items: any[] = response["similartracks"];
                let tracks: ListItem[] = [];
                for (let item of items) {
                    let listItem: ListItem = new ListItem();
                    listItem.id = item.mbid;
                    listItem.name = item.name;
                    listItem.key = item.artist.name + " - " + item.name;
                    listItem.type = "suggestion";
                    listItem.image = item.images[0] || "assets/images/defaultTrack.png";
                    tracks.push(listItem);
                }
                return tracks;
            });
    }

}