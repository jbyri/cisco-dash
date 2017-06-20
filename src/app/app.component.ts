import { Component } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'cisco-dash-app',
  templateUrl: './assets/templates/layouts/app-layout.html',
  styleUrls: ['./assets/styles/app.scss', '/node_modules/bootstrap/dist/boostrap.css', '/node_modules/bootstrap/dist/boostrap-grid.css']
})
export class AppComponent  { name = 'Angular'; }
