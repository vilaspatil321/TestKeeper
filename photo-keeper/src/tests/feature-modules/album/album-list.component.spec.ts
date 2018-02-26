import { TestBed, async } from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { PipeModule } from '../../../app/feature-modules/shared/pipes/pipe.module';
import { AlbumListComponent } from '../../../app/feature-modules/album/album-list.component';
import { InteractionService } from '../../../app/feature-modules/shared/services/interaction.service';
import { AlbumService } from '../../../app/feature-modules/shared/services/album.service';
import { AlbumServiceStub } from '../shared/services/album.service.stub';

describe('AlbumListComponent', () => {
    let fixture: any;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, RouterModule, PipeModule],
            declarations: [
                AlbumListComponent
            ],
            providers: [AlbumService,InteractionService, 
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: AlbumService, useClass: AlbumServiceStub },
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: { params: { id: 1 } }
                    }
                }
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        fixture = TestBed.createComponent(AlbumListComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));

    it('should contain 6 albums in list', async(() => {
        fixture = TestBed.createComponent(AlbumListComponent);
        const component: AlbumListComponent = fixture.debugElement.componentInstance;        
        component.ngOnInit();
        expect(component.albumList.length).toBe(4);
    }));

});
