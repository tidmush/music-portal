import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../user/user.service';
import { PlayerService } from './player.service';
import { ListItem } from '../models/list-item';
import { Track } from '../models/Track';

@Component({
  selector: 'player',
  templateUrl: './player.template.html',
  styleUrls: ['./player.style.css']
})
export class PlayerComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer, private userService: UserService, private playerService: PlayerService) { }


  player: any;
  url: SafeResourceUrl;
  suggestionsLimit: number = 2;

  current: ListItem;
  lead: ListItem;
  queue: ListItem[];
  suggestions: ListItem[];


  ngOnInit(): void {
    // this.player = new YT.Player('player', {
    //   height: '130',
    //   width: '230',
    //   events: {
    //     'onReady': onPlayerReady,
    //     'onStateChange': onPlayerStateChange
    //   }
    // });

  }

  enqueue(item: ListItem): void {
    this.queue.push(item);
  }


  private suggestionsPage: number = 0;
  next(): void {
    this.current = this.queue.shift();
    if (this.queue.length < this.suggestionsLimit + 1) {
      this.userService.getTracks(this.lead.type, null, this.suggestionsLimit, this.suggestionsPage++)
        .subscribe(response => {
          for (let track of response.toptracks) {
            let item: ListItem = new ListItem();
            item.name = track.name;
            item.key = track.name;
            item.type = "track";
            item.image = track.images[0] || "assets/images/defaultTrack.png";
            this.suggestions.push(item);
          }
        },
        error => console.error("get track sugessstions error: ", error))
    }
  }

  setLead(item: ListItem) {
    this.lead = item;
    this.suggestionsPage = 0;
  }




}
