import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagBarItemModel } from './tagbar.model'

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
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  onClick(event : any) {
    var target = event.target || event.srcElement || event.currentTarget;
    this.clicked.emit(this.dataProvider);
  }

  ngOnInit() {
  }

  ngDoCheck(){
  }
}
