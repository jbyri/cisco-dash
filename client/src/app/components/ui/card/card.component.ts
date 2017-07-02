import {
  Input, Output,
  Component,
  OnInit, OnChanges, SimpleChanges,
  ViewChild, EventEmitter,
  TemplateRef
} from '@angular/core';

import { CardContentComponent } from './card-content.component';

import { CardModel } from './card.model';
import { CardContentModel } from './card-content.model';
import { CustomerDatapointContent } from '../../../model/customer.model';

/**
 * Visual Component for a CustomerDatapointContent Object
 * which contains 1 chart's model, and its chart type and a title.
 * the chart type will indicate which ChartJS Chart should be created, and the
 * data will be decorated onto the chart template.
 */
@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {
  @Input()
  cardModel : CardModel;

  @ViewChild('content')
  cardContent : CardContentComponent;


  @Input()
  cardContentTemplate : TemplateRef<any>
  
  constructor() {
  }

  ngOnInit() {
    console.debug("ngOnInit", this.cardContent);
  }

  ngOnChanges(changes:SimpleChanges) : void {
    console.log("ngOnChanges", changes);
  }
}
