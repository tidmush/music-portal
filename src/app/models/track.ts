import {Artist} from './artist';
export class Track {
    name:string;
    playcount:number
    mbid:string;
    url:string;   
    streamable:boolean;   
   images:string[];
   artist:Artist;
}