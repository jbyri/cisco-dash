import {
  Input,
  Component,
  ViewChild,
  ViewContainerRef,
  EmbeddedViewRef
} from '@angular/core';

import { CardContentModel } from './card-content.model';
import { LifecycleHooks } from '../../abstract/lifecycle-hooks.abstract'

export interface CardContentObject {
  // TODO tie up the card chart views data via this interface
  configure(cardContentModel: CardContentModel): CardContentObject;
}

export interface CardContentBuilder {
  // pass in a reference to create the content and insert it into a view
  setViewContainerRef(viewContainerRef: ViewContainerRef): CardContentBuilder;
  getViewContainerRef(): ViewContainerRef;

  // builds an instance of card content
  buildCardContent(): CardContentObject;
}

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
export class CardContentComponent extends LifecycleHooks {
  @Input() contentModel: CardContentModel;
  @Input() contentBuilder: CardContentBuilder;

  @ViewChild('viewContainerRef', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  private view: EmbeddedViewRef<any>
  private content: CardContentObject;

  constructor() {
    super();
    this.addInput('contentModel');
    this.addInput('contentBuilder');
    this.addInput('viewContainerRef');
  }

  getContent(): CardContentObject {
    return this.content
  }

  onAllInputsReady() {
    this.content = this.contentBuilder.setViewContainerRef(this.viewContainerRef).buildCardContent();
    if (this.content != null && this.contentModel != null) {
      this.content.configure(this.contentModel);
    }
    console.log('onAllInputsReady()', this.content);
  }
}
