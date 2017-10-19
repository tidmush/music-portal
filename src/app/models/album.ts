import {Artist} from './Artist';
export class Album  {
    name:string;
    playcount:number;
    mbid:string;
    url:string;
    streamable:boolean;
    artist:Artist;
    images:string[];
}