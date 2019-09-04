import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { SpotComponent } from './pages/spot/spot.component';
import { AdComponent } from './pages/ad/ad.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SpotComponent,
    AdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
