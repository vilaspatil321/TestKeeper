import { TestBed, async } from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { PipeModule } from '../../../app/feature-modules/shared/pipes/pipe.module';
import { PhotoListComponent } from '../../../app/feature-modules/photo/photo-list.component';

describe('PhotoListComponent', () => {
    let fixture: any;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, RouterModule, PipeModule],
            declarations: [
                PhotoListComponent
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        fixture = TestBed.createComponent(PhotoListComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));

});
