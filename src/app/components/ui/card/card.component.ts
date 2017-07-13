import {
  Input,
  Output,
  Component,
  ViewChild,
  EventEmitter
} from '@angular/core';

import { CardContentComponent, CardContentBuilder } from './card-content.component';
import { LifecycleHooks } from '../../abstract/lifecycle-hooks.abstract'
import { CardModel } from './card.model';

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
export class CardComponent extends LifecycleHooks {
  @Input() cardModel: CardModel = { tags: null, title: null, contentModel: null };
  @Input() cardContentBuilder: CardContentBuilder;
  @ViewChild('content') cardContent: CardContentComponent;
  @Output() tagSelected: EventEmitter<number> = new EventEmitter<number>();

  // TODO @wnamen - these are ordered by 'tagId + 1' starting at 0. so tag with id 1 will get 'background-yellow' as its color.
  private tagClasses: Array<string> = ['background-yellow', 'background-red', 'background-green', 'background-blue', 'background-orange'];
  constructor() {
    super();

    this.addInput('cardModel');
    this.addInput('cardContentBuilder');
  }

  getTagClass(tagId: number) {
    return this.tagClasses[tagId - 1];
  }

  emitTagSelected(tagId : number) : void {
    this.tagSelected.emit(tagId);
  }
}
