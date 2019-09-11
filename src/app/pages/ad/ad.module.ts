// ====================
// MODULES
// ====================
import { NgModule } from '@angular/core';
import { AdRoutingModule } from './ad-routing.module';
import {
    MatButtonModule, MatIconModule, MatMenuModule,
    MatFormFieldModule, MatChipsModule, MatAutocompleteModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { SharedModule } from '../../shared/shared.module';
// ====================
// COMPONENTS
// ====================
import { HeaderComponent } from './components/header/header.component';
import { SpotComponent } from './components/spot/spot.component';
import { TagsComponent } from './components/tags/tags.component';
import { TagComponent } from './components/tags/tag/tag.component';
import { AdComponent } from './ad.component';
import { ReproductionControlComponent } from './components/reproduction-control/reproduction-control.component';
@NgModule({
    declarations: [
        HeaderComponent,
        SpotComponent,
        AdComponent,
        TagsComponent,
        TagComponent,
        ReproductionControlComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AdRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
        MatChipsModule,
        MatAutocompleteModule,
        NgxYoutubePlayerModule.forRoot()
    ]
})

export class AdModule { }
