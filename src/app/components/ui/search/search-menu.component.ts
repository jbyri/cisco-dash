import {
  Component,
  SimpleChanges,
  Output, Input,
  EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchMenuModel } from './search-menu.model';
import { CustomerSelectorModel } from '../selectors/customer-selector.model'
import { TagSelectorModel } from '../selectors/tag-selector.model'
import { TagBarModel } from '../tagbar/tagbar.model';
import { TagBarComponent } from '../tagbar/tagbar.component';
import { CustomerSelectorComponent } from '../selectors/customer-selector.component'
import { TagSelectorComponent } from '../selectors/tag-selector.component'
import { Customer } from '../../../model/customer.model'
import { Tag } from '../../../model/tag.model'
import { LifecycleHooks } from '../../abstract/lifecycle-hooks.abstract';
import 'rxjs/add/operator/map'

@Component({
  selector: 'search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.css']
})
export class SearchMenuComponent extends LifecycleHooks {
  @ViewChild('filterTagBar') filterTagBar: TagBarComponent;
  @ViewChild('customerSelector') customerSelector: CustomerSelectorComponent;
  @ViewChild('tagSelector') tagSelector: TagSelectorComponent;

  @Output()
  customerSelectionChanged: EventEmitter<Customer[]> = new EventEmitter<Customer[]>();

  @Output()
  tagSelectionChanged: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();

  /**
   * @Input allows a model to be passed into this component
   *
   * Provided are default values to avoid any issues.
   */
  @Input()
  model: SearchMenuModel;

  tagBarModel: TagBarModel = {
    nextTagInput: '',
    sourceData: [],
    dataProvider: []
  };

  customerSelectorModel: CustomerSelectorModel = {
    customers: []
  }

  tagSelectorModel: TagSelectorModel = {
    tags: []
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    super();

    this.addInput('filterTagBar');
    this.addInput('customerSelector');
    this.addInput('tagSelector');
  }

  /**
   * ngOnInit - description
   *
   * @return {type}  description
   */
  ngOnInit() {
    console.log('SearchMenuComponent::ngOnInit()', this.model);

  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.debug('ngOnChanges()', changes);
  }

  ngOnDestroy() {
    console.log('SearchMenuComponent::ngOnDestroy()');
  }

  refreshTagbarModelData() {
    // convert data for use in the tagbar models.
    this.tagBarModel.sourceData = [];

    this.model.tags.map(tag => {
      this.tagBarModel.sourceData.push({
        content: tag.name,
        enabled: true
      });
    });

    this.model.customers.map(customer => {
      this.tagBarModel.sourceData.push({
        content: customer.name,
        enabled: false
      });
    });
  }

  ngDoCheck() {
    this.refreshTagbarModelData();
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

  onTagSelectionChange(tags: number[]) {
    let tagsById: { [key: number]: any } = {};
    this.model.tags.map(tag => {
      tagsById[tag.id] = tag;
    })
    if (this.model.selectedTags.length > 0) {
      this.model.selectedTags.map(selectedTag => {
        this.filterTagBar.tryRemovingTag(selectedTag.name.toLowerCase(), false);
      });

      this.model.selectedTags = [];
    }
    tags.map(tagId => {
      let tag: Tag = tagsById[tagId];
      this.model.selectedTags.push(tag);
    });

    this.model.selectedTags.map(selectedTag => {
      this.filterTagBar.tryAddingTag(selectedTag.name.toLowerCase());
    });

    this.tagSelectionChanged.emit(this.model.selectedTags);
  }

  onCustomerSelectionChange(customers: string[]) {
    this.onTagSelectionChange([]);

    let customersByName: { [key: number]: any } = {};
    this.model.customers.map(customer => {
      customersByName[customer.name] = customer;
    });

    if (this.model.selectedCustomers.length > 0) {
      this.model.selectedCustomers.map(selectedCustomer => {
        this.filterTagBar.tryRemovingTag(selectedCustomer.name.toLowerCase(), true);
      });

      this.model.selectedCustomers = [];
    }
    customers.map(customerId => {
      let customer: Customer = customersByName[customerId];
      this.model.selectedCustomers.push(customer);
    });

    this.model.selectedCustomers.map(selectedCustomer => {
      this.filterTagBar.tryAddingTag(selectedCustomer.name.toLowerCase());
    });

    this.customerSelectionChanged.emit(this.model.selectedCustomers);
  }
}
