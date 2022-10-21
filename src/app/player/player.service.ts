import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Settings } from '../settings';
import { ListItem } from '../models/list-item';
import { YoutubeResult } from '../models/youtube-result';


@Injectable()
export class PlayerService {
    constructor(private settings: Settings, private http: HttpClient) { }
    private itemAddedSource = new Subject<ListItem>();
    itemAdded$ = this.itemAddedSource.asObservable();


    addItem(listItem: ListItem) {
        this.itemAddedSource.next(listItem);
    }

    getUrl(query: string, resultType: string): Observable<string> {
        let url = this.settings.youtube.root
            + "search?"
            + "part=id&maxResults=1&q="
            + query.replace(/\\w/g, "+")
            + "&type=video&key="
            + this.settings.youtube.apiKey;
        return this.http.get<YoutubeResult>(url)
            .map(
            response => {
                if (response.pageInfo.totalResults == 0)
                    return null;

                let item = response.items[0];
                if (resultType === "id")
                    return item.id.videoId;

                let url = this.settings.youtube.baseUrl + item.id.videoId + "?enablejsapi=1";
                return url;
            });


    }

}