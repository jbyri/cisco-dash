import {
  Input, Output,
  Component,
  OnInit, OnChanges, SimpleChanges,
  ViewChild, EventEmitter
} from '@angular/core';

import { CardContentModel } from './card-content.model';


/**
 * Visual Component for a CustomerDatapointContent Object
 * which contains 1 chart's model, and its chart type and a title.
 * the chart type will indicate which ChartJS Chart should be created, and the
 * data will be decorated onto the chart template.
 */
@Component({
  selector: 'card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css']
})
export class CardContentComponent implements OnInit, OnChanges {
  @Input()
  content:CardContentModel;

  constructor() {
  }

  ngOnInit() {
    console.log("content", this.content);
  }

  ngOnChanges(changes:SimpleChanges) : void {
    console.log("ngOnChanges", changes);
  }
}
