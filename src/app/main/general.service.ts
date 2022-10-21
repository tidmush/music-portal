import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Settings } from '../settings';
import { Md5 } from 'ts-md5/dist/md5';


@Injectable()
export class GeneralService {
    constructor(private settings: Settings) { }

  
    generateApiUrl(request: any, additionalParams: any[]): string {
        let sig = this.generateSignature(request, additionalParams);
        let url = this.settings.lastfm.root + (this.settings.lastfm.isMock ? request["method"] + ".json?" : '?');
        let requestParams = Object.keys(request);
        for (var i = 0; i < requestParams.length; i++) {
            url += requestParams[i] + '=' + request[requestParams[i]] + '&';
        }

        url += 'api_sig=' + sig + '&format=json';
        console.info('generated url: ', url);
        return url;
    }

    private generateSignature(request: any, additionalParams: any[]): string {
        let keys = Object.keys(request);
        keys = keys.sort();
        let presig = '';
        for (var i = 0; i < keys.length; i++) {
            presig += keys[i] + request[keys[i]];
        }

        if (additionalParams) {
            for (var i = 0; i < additionalParams.length; i++) {
                presig += additionalParams[i];

            }
        }
        presig += this.settings.lastfm.secret;
        console.info('before md5', presig);
        let sig = Md5.hashStr(presig) as string;
        return sig;
    }
}