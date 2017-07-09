import { Customer, CustomerModel } from '../../../model/customer.model';
import { Tag } from '../../../model/tag.model';

/**
 * The search menu model
 */
export interface SearchMenuModel {
  config: SearchMenuConfig,
  customers: Customer[],
  selectedCustomers: Customer[],
  selectedCustomerModels: CustomerModel[],
  tags: Tag[],
  selectedTags: Tag[],
  tagsById: Map<number, Tag>
}

/**
 * The configuration for search menu behavior
 */
export interface SearchMenuConfig {
  maxSelectableCustomers: number,
  maxSelectableTags: number
}
