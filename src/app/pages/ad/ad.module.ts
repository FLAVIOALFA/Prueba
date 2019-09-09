// ====================
// MODULES
// ====================
import { NgModule } from '@angular/core';
import { AdRoutingModule } from './ad-routing.module';
import {
    MatButtonModule, MatIconModule, MatMenuModule,
    MatFormFieldModule, MatChipsModule, MatAutocompleteModule
} from '@angular/material';
// ====================
// COMPONENTS
// ====================
import { HeaderComponent } from './components/header/header.component';
import { SpotComponent } from './components/spot/spot.component';
import { TagsComponent } from './components/tags/tags.component';
import { TagComponent } from './components/tags/tag/tag.component';
import { AdComponent } from './ad.component';
import { ReproductionControlComponent } from './components/reproduction-control/reproduction-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
        AdRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
        MatChipsModule,
        MatAutocompleteModule
    ]
})

export class AdModule { }
