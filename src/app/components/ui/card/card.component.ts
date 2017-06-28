import { Input, Output, Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { CardModel } from './card.model';
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
export class CardComponent {
  @Input()
  cardModel : CardModel;

  constructor() {
  }

  ngOnInit() {
  }
}
