import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
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
  constructor(private userService: UserService, private playerService: PlayerService, private renderer: Renderer2) {
    this.playerService.itemAdded$.subscribe(item => {
      this.enqueue(item);
      this.lead = item;
    });
  }


  //player: any;
  url: SafeResourceUrl;
  minQueueSize: number = 4;

  current: ListItem;
  lead: ListItem;
  queue: ListItem[] = [];



  ngOnInit(): void {


  }

  enqueue(item: ListItem): void {
    this.playerService.getUrl(item.key, "url")
      .subscribe(response => {
        item.tag = response;
        if (this.current) {
          this.queue.push(item);
        }
        else {
          this.play(item);
        }

        console.info("new track added, url: ", response);
      },
      error => console.error("get url error: ", error))
  }


  next(): void {
    this.play(this.queue.shift());

    if (this.queue.length < this.minQueueSize) {
      this.userService.getSimilar(this.lead.id, this.minQueueSize - this.queue.length, 1)
        .subscribe(response => {
          for (let item of response) {
            this.enqueue(item);
          }
        },
        error => console.error("get track sugessstions error: ", error))
    }
  }

  play(item) {
    this.current = item;
    let player: any = new window["YT"].Player();
  }
  onPlayerReady(event): void {
    console.info("player ready", event);
  }

  onPlayerStateChange(event): void {
    console.info("player state changed", event);
  }
}
