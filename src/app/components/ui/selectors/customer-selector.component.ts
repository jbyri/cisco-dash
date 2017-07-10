import { Input, Output, Component, Pipe, PipeTransform, EventEmitter } from '@angular/core';
import { CustomerSelectorModel } from './customer-selector.model';
import { Customer } from '../../../model/customer.model'
import { Utils } from '../../../services/utils/utils.component'

@Pipe({
    name: 'customerFilter',
    pure: false
})
export class CustomerFilterPipe implements PipeTransform {
    transform(items: Customer[]): any {
        if (!items) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => {
          return  item.enabled
        });
    }
}

@Component({
  selector: 'customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.css']
})
export class CustomerSelectorComponent {

  filterArgs : any = {
    enabled : true
  }
  // can be set from html [dataProvider]=someDataProviderVar
  dataProvider: CustomerSelectorModel = {
    customers: []
  }

  // output when clicked can be bound by (selectionChanged)=onSelectionChanged($event)
  @Output()
  selectionChanged: EventEmitter<Customer[]> = new EventEmitter<Customer[]>();
  onSelect(event: any): void {
    console.log('customerSelector::onSelect() - ', event);
    let selectedCustomers: Customer[] = <Customer[]>this.utils.getSelectedValues(event);
    this.selectionChanged.emit(selectedCustomers);
  }

  constructor(private utils: Utils) {

  }
}
