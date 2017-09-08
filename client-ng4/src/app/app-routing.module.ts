import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//import { EmojisComponent }      from './emojis.component';
//import { WeatherComponent }  from './weather.component';
//import { TracksComponent } from './tracks.component';

import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  //{ path: 'weather', component : WeatherComponent },
  //{ path: 'play',  component: TracksComponent },
  //{ path: 'emojis',     component: EmojisComponent }
  //{ path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
