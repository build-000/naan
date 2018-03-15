import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AppComponent } from './app.component';
import { EmojiService } from './emoji.service';
import { WeatherService } from './weather.service';
import { TrackService } from './track.service';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    Angulartics2Module,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
  ],
  declarations: [
    AppComponent
  ],
  providers: [ EmojiService, WeatherService, TrackService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
