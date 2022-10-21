import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { PlayerService } from '../player/player.service';
import { ListItem } from '../models/list-item';
import { Track } from '../models/Track';

@Component({
  selector: 'user',
  templateUrl: './user.template.html',
  styleUrls: ['./user.style.css']
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService, private playerService: PlayerService) { }
  favoriteTracks: ListItem[] = [];
  favoriteArtists: ListItem[] = [];
  favoriteTags: ListItem[] = [];


  ngOnInit(): void {
    Promise.all([
      this.fillFavoriteTracks(),
      this.fillFavoriteArtists(),
      this.fillFavoriteTags()
    ]);
  }

  enqueue(listItem: ListItem) {
    this.playerService.addItem(listItem);
  }

  fillFavoriteArtists(): void {
    this.userService.getUserTop('TopArtists', null, null, 0)
      .subscribe(
      response => {
        console.info("top artists:", response);
        for (let artist of response.topartists) {
          this.userService.getTop("artist", artist.name, 1, 1)
          .subscribe(response => {
            this.favoriteArtists.push(response);
          })       
        }
      },
      error => console.error("get session error: ", error)
      );
  }

  fillFavoriteTags(): void {
    this.userService.getUserTop('TopTags', null, null, 0)
      .subscribe(
      response => {
        console.info("top tags:", response);
        for (let tag of response.toptags) {
          this.userService.getTop("tag", tag.name, 1, 1)
            .subscribe(response => {
              this.favoriteTags.push(response);
            })
        }
      },
      error => console.error("get session error: ", error)
      );
  }

  fillFavoriteTracks(): void {
    this.userService.getUserTop('TopTracks', null, null, 0)
      .subscribe(
      response => {
        console.info("top tracks:", response);
        for (let track of response.toptracks) {
          let recommandation: ListItem = new ListItem();
          recommandation.id = track.mbid;
          recommandation.name = track.name;
          recommandation.key = track.artist.name + " - " + track.name;
          recommandation.type = "track";
          recommandation.image = track.images[0] || "assets/images/defaultTrack.png";
          this.favoriteTracks.push(recommandation);
        }
      },
      error => console.error("get top tracks error: ", error)
      );
  }
}
