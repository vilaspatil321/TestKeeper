import { Injectable } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Album } from '../types/album';
import { ALBUM_API_URL } from '../config/config'

@Injectable()
export class AlbumService {
    constructor(private httpService: Http) {
    }

    getUserAlbums(userId: number): Observable<Album[]> {
        return this.httpService.get(ALBUM_API_URL).map(
            (response: Response) => response.json().filter((album) => album.userId == userId)
        );
    }
}
