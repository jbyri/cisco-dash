import { Input, Output, Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { CustomerSelectorModel } from '../../../model/customer-selector.model';
import { Customer } from '../../../model/customer.model'
import { Utils } from '../../../services/utils/utils.component'

@Component({
  selector: 'customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.css']
})
export class CustomerSelectorComponent {

  @Input()
  dataProvider:CustomerSelectorModel = {
    customers : []
  }
  // output when clicked
  @Output()
  selectionChanged : EventEmitter<Customer[]> = new EventEmitter<Customer[]>();
  onSelect(event : any) : void {
    console.log("customerSelector::onSelect() - ", event);
    let selectedCustomers = this.utils.getSelected(event);
    this.selectionChanged.emit(<Customer[]>selectedCustomers);
  }

  constructor(private utils:Utils){

  }
}
