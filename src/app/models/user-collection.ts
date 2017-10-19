import {Track} from './track';
import {Artist} from './artist';
import {Album} from './album';

export class UserCollection {
    user: string;
    type: string;
    tag:string;
    toptracks:Track[];
    topartists:Artist[];
    topalbums:Album[];
}