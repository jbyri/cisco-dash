import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchMenuModel } from '../../../model/search-menu.model';
import { CustomerSelectorModel } from '../../../model/customer-selector.model'
import { TagSelectorModel } from '../../../model/tag-selector.model'
import { TagBarModel } from '../../../model/tagbar.model';
import { TagBarComponent } from '../tagbar/tagbar.component';
import { CustomerSelectorComponent } from '../selectors/customer-selector.component'
import { TagSelectorComponent } from '../selectors/tag-selector.component'
import { Customer } from '../../../model/customer.model'
import { Tag } from '../../../model/tag.model'
import 'rxjs/add/operator/map'

@Component({
  selector: 'search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.css']
})
export class SearchMenuComponent implements OnInit {
  @ViewChild('filterTagBar') filterTagBar : TagBarComponent;
  @ViewChild('customerSelector') customerSelector : CustomerSelectorComponent;
  @ViewChild('tagSelector') tagSelector : TagSelectorComponent;

  /**
   * @Input allows a model to be passed into this component
   *
   * Provided are default values to avoid any issues.
   */
  @Input()
  model:SearchMenuModel;

  tagBarModel : TagBarModel = {
    nextTagInput : "",
    sourceData : [],
    dataProvider : []
  };

  customerSelectorModel : CustomerSelectorModel = {
    customers:[]
  }

  tagSelectorModel : TagSelectorModel = {
    tags:[]
  }

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
    // convert data for use in the tagbar models.
    this.tagBarModel.sourceData = [];
    
    this.model.tags.map(tag => {
      this.tagBarModel.sourceData.push({
        content:tag.name,
        enabled:true
      });
    });

    this.tagSelectorModel.tags = this.model.tags;
    this.customerSelector.dataProvider.customers = this.model.customers;
  }

  ngAfterViewChecked() {

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
