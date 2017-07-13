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
import { TagBarItemModel } from '../tagbar/tagbar.model';

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
  emittingTagSelectionChanged: boolean = false;
  emittingCustomerSelectionChanged: boolean = false;

  model: SearchMenuModel = {
    config: {
      maxSelectableTags: 3,
      maxSelectableCustomers: 1
    },

    customers: [],
    selectedCustomers: [],
    selectedCustomerModels: [],
    selectedTags: [],
    tags: [],
    tagsById: new Map()
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    super();

    this.addInput('filterTagBar');
    this.addInput('customerSelector');
    this.addInput('tagSelector');
  }

  refreshTagbarModelData() {
    // convert data for use in the tagbar models.
    this.filterTagBar.model.sourceData = [];

    if(this.model.tags === undefined) {
      this.model.tags = [];
    }

    this.model.tags.map(tag => {
      this.filterTagBar.model.sourceData.push({
        content: tag.name,
        tagId: tag.id,
        enabled: true
      });
    });

    // customer tags aren't selectable as other tags are
    // so here we avoid its tag id and disable it.
    this.model.customers.map(customer => {
      this.filterTagBar.model.sourceData.push({
        content: customer.name,
        tagId: -1,
        enabled: false
      });
    });
  }

  ngDoCheck() {
    this.refreshTagbarModelData();
    this.tagSelector.model.tags = this.model.tags;
    this.customerSelector.dataProvider.customers = this.model.customers;
    if (this.model.tagsById.size == 0) {
      this.buildTagIndex();
    }
  }

  buildTagIndex() {
    this.model.tagsById.clear();
    this.model.tags.map(tag => {
      if (tag != undefined) {
        this.model.tagsById.set(tag.id, tag);
      }
    });
  }

  findTag(tagId: any): Tag {
    let tag: Tag;
    if (typeof (tagId) === 'string') {
      tag = this.model.tagsById.get(parseInt(tagId));
    } else if (typeof (tagId) === 'number') {
      tag = this.model.tagsById.get(tagId);
    }

    return tag;
  }

  onTagBarSelectionChange(tagBarItemModels: TagBarItemModel[]) {
    let newTagSelection: number[] = [];
    tagBarItemModels.map(tagBarItemModel => {
      if (tagBarItemModel.enabled) {
        newTagSelection.push(tagBarItemModel.tagId);
      }
    });

    // rerun the tag selection
    this.onTagSelectionChange(newTagSelection);
  }

  onTagSelectionChange(tagIds: number[]) {
    console.log("onTagSelectionChange");

    if (this.model.selectedTags.length > 0) {
      this.model.selectedTags.map(selectedTag => {
        this.filterTagBar.tryRemovingTag(selectedTag.name.toLowerCase(), false);
      });

      this.model.selectedTags = [];
    }

    tagIds.map(tagId => {
      let tag: Tag = this.findTag(tagId);
      if (tag !== undefined) {
        this.model.selectedTags.push(tag);
      } else {
        console.error('could not find tag: ' + tagId + ", " + typeof (tagId));
      }
    });

    this.model.selectedTags.map(selectedTag => {
      this.filterTagBar.tryAddingTag(selectedTag.name.toLowerCase());
    });

    this.tagSelector.setSelectedElements(tagIds);
    this.emitTagSelectionChanged();
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

    this.emitCustomerSelectionChanged();
  }

  emitCustomerSelectionChanged() {
    if (!this.emittingCustomerSelectionChanged) {
      this.emittingCustomerSelectionChanged = true;
      this.customerSelectionChanged.emit(this.model.selectedCustomers);
      this.emittingCustomerSelectionChanged = false;
    }
  }
  emitTagSelectionChanged() {
    if (!this.emittingTagSelectionChanged) {
      this.emittingTagSelectionChanged = true;
      this.tagSelectionChanged.emit(this.model.selectedTags);
      this.emittingTagSelectionChanged = false;
    }
  }
}
