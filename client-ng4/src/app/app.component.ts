import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-app',
  styleUrls: ['../assets/sass/main.scss'],
  encapsulation: ViewEncapsulation.None,
  template:
    '<my-naan></my-naan>'
})
export class AppComponent {}
