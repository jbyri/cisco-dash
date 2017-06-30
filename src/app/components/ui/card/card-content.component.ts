import {
  Input, Output,
  Component,
  OnInit, OnChanges, SimpleChanges,
  ViewChild, EventEmitter,
  ViewContainerRef,
  EmbeddedViewRef,
  TemplateRef
} from '@angular/core';

import { CardContentModel } from './card-content.model';


export interface CardContentObject {
  // TODO tie up the card chart views data via this interface
}

export interface CardContentBuilder {
  // builds an instance of card content
  buildCardContent() : CardContentObject
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
export class CardContentComponent implements OnInit, OnChanges {
  @Input()
  contentModel:CardContentModel;

  @Input()
  contentBuilder : CardContentBuilder;

  @Input()
  contentTemplate : TemplateRef<any>

  @ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;
  constructor() {

  }

  /**
   * Hook to insert the dynamic view content (using templates)
   */
  ngAfterViewInit() {
    let view : EmbeddedViewRef<any> = this.contentTemplate.createEmbeddedView(null);
    this.vc.insert(view);
  }

  ngOnInit() {
    console.log("content", this.contentModel);
  }

  ngOnChanges(changes:SimpleChanges) : void {
    console.log("ngOnChanges", changes);
  }
}
