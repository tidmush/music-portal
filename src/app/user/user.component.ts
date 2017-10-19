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
  favoriteAlbums: ListItem[] = [];


  ngOnInit(): void {
    Promise.all([
      this.fillFavoriteTracks(),
      this.fillFavoriteArtists(),
      this.fillFavoriteAlbums()
    ]);
  }

  enqueue(listItem: ListItem) {
    listItem = this.fetchTrack(listItem);
    this.playerService.enqueue(listItem);
  }

  fillFavoriteArtists(): void {
    this.userService.getTracks('TopArtists', null, null, 0)
      .subscribe(
      response => {
        console.info("top artists:", response);
        for (let artist of response.topartists) {
          let recommandation: ListItem = new ListItem();
          recommandation.name = artist.name;
          recommandation.key = artist.name;
          recommandation.type = "artist";
          recommandation.image = artist.images[0] || "assets/images/defaultArtist.png";
          this.favoriteArtists.push(recommandation);
        }
      },
      error => console.error("get session error: ", error)
      );
  }

  fillFavoriteAlbums(): void {
    this.userService.getTracks('TopAlbums', null, null, 0)
      .subscribe(
      response => {
        console.info("top albums:", response);
        for (let album of response.topalbums) {
          let recommandation: ListItem = new ListItem();
          recommandation.name = album.name;
          recommandation.key = album.name;
          recommandation.type = "album";
          recommandation.image = album.images[0] || "assets/images/defaultAlbum.png";
          this.favoriteAlbums.push(recommandation);
        }
      },
      error => console.error("get session error: ", error)
      );
  }

  fillFavoriteTracks(): void {
    this.userService.getTracks('TopTracks', null, null, 0)
      .subscribe(
      response => {
        console.info("top tracks:", response);
        for (let track of response.toptracks) {
          let recommandation: ListItem = new ListItem();
          recommandation.name = track.name;
          recommandation.key = track.name;
          recommandation.type = "track";
          recommandation.image = track.images[0] || "assets/images/defaultTrack.png";
          this.favoriteTracks.push(recommandation);
        }
      },
      error => console.error("get session error: ", error)
      );
  }

  fetchTrack(listItem: ListItem): ListItem {
    switch (listItem.type) {
      case "artist":
        break;
      case "album":
        break;
      default:
        return listItem;
    }
  }
}
