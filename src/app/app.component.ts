import { Component } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { HostListener,Directive,HostBinding} from '@angular/core';

// TODO @wnamen figure out how to add full-size class to host element for this
// component `cisco-dash-app`
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'cisco-dash-app',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '/node_modules/bootstrap/dist/boostrap.css',
    '/node_modules/bootstrap/dist/boostrap-grid.css'
  ]
})
export class AppComponent  {
  name = 'Angular';
}
