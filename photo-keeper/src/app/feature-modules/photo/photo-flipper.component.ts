import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { Subscription } from 'rxjs';
import { PhotoService } from '../shared/services/photo.service';
import { InteractionService } from '../shared/services/interaction.service';
import { Photo } from '../shared/types/photo';
import { ALBUM_FLIP_INTERVAL } from '../shared/config/config';

@Component({
    selector: 'photo-flipper',
    templateUrl: './photo-flipper.component.html',
    styleUrls: ['./photo-flipper.component.css']
})
export class PhotoFlipperComponent implements OnInit, OnDestroy {
    albumId1: number;
    photoList: Photo[] = [];
    timerSubscription: ISubscription;
    activeAlbumId: number;
    getPhotosSubscription: ISubscription;
        
    constructor(private route: ActivatedRoute,
        private photoService: PhotoService,
        private interactionService: InteractionService) {
    }

    ngOnInit() {        
        this.getPhotosSubscription = this.photoService.getAlbumPhotos(this.interactionService.albumIds).subscribe(
            (result) => {
                result.map((photo) => this.photoList.push(photo))
                if (this.interactionService.albumIds.length > 1) {
                    let timer = TimerObservable.create(0, ALBUM_FLIP_INTERVAL);                
                    this.timerSubscription = timer.subscribe(t => {
                        //this logic would work for any number of albums in the albumIds array
                        //it will display each album in array for 20 seconds and will show the next album in the array
                        //when it reaches the end of array it resumes from showing first item again
                        if (this.activeAlbumId){                            
                            let index: number = this.interactionService.albumIds.indexOf(this.activeAlbumId);
                            if (index < this.interactionService.albumIds.length - 1) {
                                this.activeAlbumId = this.interactionService.albumIds[index + 1];
                                return;
                            }
                        }
                        this.activeAlbumId = this.interactionService.albumIds[0];
                    });
                }
                else
                    this.activeAlbumId = this.interactionService.albumIds[0];
            }
        );
    }

    getAlbumIdList() {
        return this.interactionService.albumIds.sort((a, b) => a - b);
    }

    getAlbumPhotoList(albumId: number) {
        return this.photoList.filter((photo) => photo.albumId==albumId);
    }

    ngOnDestroy() {
        if (this.getPhotosSubscription)
            this.getPhotosSubscription.unsubscribe();
        if (this.timerSubscription)
            this.timerSubscription.unsubscribe();
    }
}