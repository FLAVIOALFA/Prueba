// ====================
// MODULES
// ====================
import { NgModule } from '@angular/core';
import { AdRoutingModule } from './ad-routing.module';
import { MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';
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
    imports: [
        AdRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
    ]
})

export class AdModule { }
