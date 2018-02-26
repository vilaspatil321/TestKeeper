import {Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { AlbumService } from '../shared/services/album.service';
import { InteractionService } from '../shared/services/interaction.service';
import { Album } from '../shared/types/album';
import { MAX_ALLOWED_ALBUMS } from '../shared/config/config';

@Component({
    selector: 'album-list',
    templateUrl: './album-list.component.html',
    styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit, OnDestroy {
    userId: number;
    albumList: Album[] = [];
    selectedCount: number = 0;
    validationMessage: string;
    getAlbumsSubscription: ISubscription;

    constructor(private route: ActivatedRoute,
                private albumService: AlbumService,
                private interactionService: InteractionService) {        
    }

    ngOnInit() {
        this.interactionService.albumIds = [];
        this.userId = parseInt(this.route.snapshot.params['id']);
        this.getAlbumsSubscription = this.albumService.getUserAlbums(this.userId).subscribe(
            (result) => {
                result.map((album) => this.albumList.push(album))
            }
        );
    }    

    toggleSelection(album: Album) {
        if (!('isSelected' in album))            
            album.isSelected = false;
        if (this.selectedCount == MAX_ALLOWED_ALBUMS && !album.isSelected) {
            this.validationMessage = 'Only ' + MAX_ALLOWED_ALBUMS +' albums can be selected at most!';
            return;
        }
        this.validationMessage = '';
        album.isSelected = !album.isSelected;
        if (album.isSelected) {
            this.interactionService.albumIds.push(album.id);
            this.selectedCount += 1;
        }
        else {
            const index = this.interactionService.albumIds.indexOf(album.id);
            this.interactionService.albumIds.splice(index,1);
            this.selectedCount -= 1;
        }
    }

    ngOnDestroy() {
        if (this.getAlbumsSubscription)
            this.getAlbumsSubscription.unsubscribe();
    }
}