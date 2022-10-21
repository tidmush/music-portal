import {Track} from './track';
import {Artist} from './artist';
import {Tag} from './tag';

export class UserCollection {
    user: string;
    type: string;
    tag:string;
    toptracks:Track[];
    topartists:Artist[];
    toptags:Tag[];
}