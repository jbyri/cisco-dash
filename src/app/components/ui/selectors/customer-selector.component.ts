import { Input, Component, OnInit, ViewChild } from '@angular/core';
import { CustomerSelectorModel } from '../../../model/customer-selector.model';

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

  constructor(){

  }
}
