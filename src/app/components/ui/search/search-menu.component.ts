import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchMenuModel } from '../../../model/search-menu.model';
import { TagBarComponent } from '../tagbar/tagbar.component';

import 'rxjs/add/operator/map'

@Component({
  selector: 'search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.css']
})
export class SearchMenuComponent implements OnInit {

  @ViewChild('filterTagBar') filterTagBar : TagBarComponent;


  /**
   * @Input allows a model to be passed into this component
   *
   * Provided are default values to avoid any issues.
   */
  @Input()
  model:SearchMenuModel;


  constructor(
    private route: ActivatedRoute,
    private router:Router) {
    console.log("SearchMenuComponent::construct", route, router);
  }

  ngOnInit() {
    console.log("SearchMenuComponent::ngOnInit()", this.model);
  }

  ngOnDestroy() {
    console.log("SearchMenuComponent::ngOnDestroy()");
  }

  ngDoCheck() {
    // console.log("SearchMenuComponent::ngDoCheck()");
  }

  ngAfterViewChecked() {
    // console.log("SearchMenuComponent::ngAfterViewChecked()");
  }
  ngAfterViewInit() {
    // console.log("SearchMenuComponent::ngAfterViewInit()");
  }

  ngAfterContentInit() {
    // console.log("SearchMenuComponent::ngAfterContentInit()");
  }
  ngAfterContentChecked() {
    // console.log("SearchMenuComponent::ngAfterContentChecked()");
  }
}
