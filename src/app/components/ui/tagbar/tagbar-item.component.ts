import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagBarItemModel } from '../../../model/tagbar.model'

import 'rxjs/add/operator/map'

@Component({
  selector: 'tagbar-item',
  templateUrl: './tagbar-item.component.html',
  styleUrls: ['./tagbar-item.component.css']
})
export class TagBarItemComponent implements OnInit, OnChanges {
  @Input()
  dataProvider : TagBarItemModel;

  // output when clicked
  @Output()
  clicked : EventEmitter<TagBarItemModel> = new EventEmitter<TagBarItemModel>();

  constructor(
    private route: ActivatedRoute,
    private router:Router) {
    console.log("TagBarItemComponent::constructor", route, router);
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  onClick(event : any) {
    var target = event.target || event.srcElement || event.currentTarget;
    console.log("TagBarItemComponent::onClick() ->", this.dataProvider, event);
    this.clicked.emit(this.dataProvider);
  }

  ngOnInit() {
    console.log("TagBarItemComponent::ngOnInit()", this.dataProvider);

  }

  ngDoCheck(){
    
  }
}
