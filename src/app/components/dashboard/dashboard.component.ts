import { Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { DashboardDataService } from '../../services/dashboard/dashboarddata.service'
import { SearchMenuModel } from '../ui/search/search-menu.model'
import { Tag } from '../../model/tag.model'
import { Customer, CustomerModel } from '../../model/customer.model'
import { TagBarComponent } from '../ui/tagbar/tagbar.component'
import { SearchMenuComponent} from '../ui/search/search-menu.component'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


/**
 * This component represents the dashboard page (routed to `/dashboard`)
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  model: any = {

  };
  selectedCustomerModel : CustomerModel = {
    data : {
      datapoints : [],
      feedbacks : []
    }
  };
  searchMenuModel: SearchMenuModel = {
    config: {
      maxSelectableTags: 3,
      maxSelectableCustomers: 1
    },
    customers: [],
    selectedCustomers: [],
    selectedCustomerModels : [],
    selectedTags: [],
    tags: []
  };

  loading = false;
  returnUrl: string;
  toggled = false;

  handleMenuToggle() {
    this.toggled= !this.toggled;
  }

  private account: Object;

  @ViewChild('searchMenu') searchMenuComponent: SearchMenuComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private dashboardDataService: DashboardDataService) {
  }

  public refreshDashboardData() {
    this.selectedCustomerModel = this.searchMenuModel.selectedCustomerModels[0];
  }

  // When the customer selection is changed, we repopulate the models.
  onCustomerSelectionChanged(customers : Customer[]) : void {
    console.debug("Dashboard::onCustomerSelectionChange", customers);
    if(customers.length > 0) {
      let customer : Customer = customers[0];
      let customerDataTask : Observable<CustomerModel> = this.dashboardDataService.loadCustomerData(customer.dataUrl);
      const subscription = customerDataTask.subscribe(customerModel => {
        this.searchMenuModel.selectedCustomerModels = [customerModel];
        this.refreshDashboardData()
        subscription.unsubscribe();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
     // changes.prop contains the old and the new value...
     console.debug("ngOnChanges()", changes);
  }
  /**
   * ngOnInit - description
   */
  ngOnInit() : void {
    // fetch tags and customers
    let tagsTask: Observable<Tag[]> = this.dashboardDataService.loadTags();
    let customersTask: Observable<Customer[]> = this.dashboardDataService.loadCustomers();

    const tagsSubscription = tagsTask.subscribe(tags => {
      this.searchMenuModel.tags = tags;
      tagsSubscription.unsubscribe();
    });

    const custSubscription = customersTask.subscribe(customers => {
      this.searchMenuModel.customers = customers;
      custSubscription.unsubscribe();
    });
  }


  ngOnDestroy() : void {
    this.searchMenuModel.tags = null;
    this.searchMenuModel.customers = null;
    this.searchMenuModel = null;
  }
}
