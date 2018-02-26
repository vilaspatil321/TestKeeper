import {Component, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PhotoService } from '../shared/services/photo.service';
import { InteractionService } from '../shared/services/interaction.service';

@Component({
    selector: 'photo-list',
    templateUrl: './photo-list.component.html',
    styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent  {
    @Input() photoList: any;
    
}