import { Injectable } from '@angular/core';
import {ListItem} from '../models/list-item';

@Injectable()
export class PlayerService {
    queue: string[];

    enqueue(item: ListItem): void {
        let url = ""
        this.queue.push(url);
    }
    dequeue(): string {
        return this.queue.shift();
    }


    getUrl(query: string): string {
        return "";
    }

}