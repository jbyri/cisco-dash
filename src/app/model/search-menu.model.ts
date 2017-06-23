import { Customer, CustomerModel } from '../model/customer.model';
import { Tag } from '../model/tag.model';

export interface SearchMenuModel {
  customers : Customer[],
  customerModel : CustomerModel,
  tags : Tag[],
  dataSelection : object[]
}
