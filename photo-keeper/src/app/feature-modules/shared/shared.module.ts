import {NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import { UserService } from './services/user.service';
import { AlbumService } from './services/album.service';
import { PhotoService } from './services/photo.service';
import { InteractionService } from './services/interaction.service';


@NgModule({
    declarations: [],
    imports: [HttpModule],
    exports: [],
    providers: [UserService, AlbumService, PhotoService, InteractionService]
})
export class SharedModule { }