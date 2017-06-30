import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { DashboardDataService } from '../../services/dashboard/dashboarddata.service'
import { SearchMenuModel } from '../ui/search/search-menu.model'
import { Tag } from '../../model/tag.model'
import { CardContentModel, ChartContentModel } from '../ui/card/card-content.model';
import { Customer, CustomerModel, CustomerDatapoint, CustomerDatapointContent } from '../../model/customer.model'
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

  @ViewChild("barchartTemplate") barchartTemplate : TemplateRef<any>;

  handleMenuToggle() {
    this.toggled= !this.toggled;
  }
  bricks = require('../../../../node_modules/bricks.js/dist/bricks.js')

  sizes = [
    { columns: 2, gutter: 10 },                   // assumed to be mobile, because of the missing mq property
    { mq: '768px', columns: 3, gutter: 25 },
    { mq: '1024px', columns: 4, gutter: 50 }
  ]

  bricksInstance = this.bricks({
    container: '.card-container',
    packed: 'data-packed',        // if not prefixed with 'data-', it will be added
    sizes: this.sizes
  })




  private account: Object;

  @ViewChild('searchMenu') searchMenuComponent: SearchMenuComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private dashboardDataService: DashboardDataService) {
      console.log(this.bricksInstance)

      this.bricksInstance
        .on('pack',   () => console.log('ALL grid items packed.'))
        .on('update', () => console.log('NEW grid items packed.'))
        .on('resize', (size : object) => console.log('The grid has be re-packed to accommodate a new BREAKPOINT.'))
  }

  public refreshDashboardData() {
    this.selectedCustomerModel = this.searchMenuModel.selectedCustomerModels[0];
  }

  public getTagsFromCustomerDatapoint( dataPoint : CustomerDatapoint ) : Tag[]{
    let tags : Tag[] = [];
    dataPoint.tagIds.map(tagId =>
      Array.prototype.push.apply(tags,
        this.searchMenuModel.tags.filter(tag => tag.id === tagId)));

    if(tags.length < 1) {
      console.error("no tags were in datapoint: ", dataPoint.title);
    }

    return tags;
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

  ngAfterViewInit() {
      console.log("ngAfterViewInit, barchartTemplate", this.barchartTemplate);
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


  /**
   * Builds the card content model which will also include its source view template.
   */
  buildCardContentModel(content : CustomerDatapointContent)  : CardContentModel {
    let cardContentModel  : ChartContentModel = {
      componentData : content.data
    }


    switch(content.type) {
      case "barChart":

        break;
      default:
        break;
    }
    console.log("buildCardContentModel", content,  cardContentModel);
    return cardContentModel;
  }

  ngOnDestroy() : void {
    this.searchMenuModel.tags = null;
    this.searchMenuModel.customers = null;
    this.searchMenuModel = null;
  }
}
