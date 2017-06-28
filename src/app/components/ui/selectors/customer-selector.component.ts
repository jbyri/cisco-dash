import { Input, Output, Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { CustomerSelectorModel } from './customer-selector.model';
import { Customer } from '../../../model/customer.model'
import { Utils } from '../../../services/utils/utils.component'

@Component({
  selector: 'customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.css']
})
export class CustomerSelectorComponent {

  // can be set from html [dataProvider]=someDataProviderVar
  @Input()
  dataProvider:CustomerSelectorModel = {
    customers : []
  }

  // output when clicked can be bound by (selectionChanged)=onSelectionChanged($event)
  @Output()
  selectionChanged : EventEmitter<Customer[]> = new EventEmitter<Customer[]>();
  onSelect(event : any) : void {
    console.log("customerSelector::onSelect() - ", event);
    let selectedCustomers = this.utils.getSelectedValues(event);
    this.selectionChanged.emit(<Customer[]>selectedCustomers);
  }

  constructor(private utils:Utils){

  }
}
