// ====================
// MODULES
// ====================
import { NgModule } from '@angular/core';
import { AdRoutingModule } from './ad-routing.module';
// ====================
// COMPONENTS
// ====================
import { HeaderComponent } from './components/header/header.component';
import { SpotComponent } from './components/spot/spot.component';
import { TagsComponent } from './components/tags/tags.component';
import { TagComponent } from './components/tags/tag/tag.component';
import { AdComponent } from './ad.component';
@NgModule({
    declarations: [
        HeaderComponent,
        SpotComponent,
        AdComponent,
        TagsComponent,
        TagComponent
    ],
    imports: [ AdRoutingModule ]
})

export class AdModule { }
