import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  TemplateRef
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { DashboardDataService } from '../../services/dashboard/dashboarddata.service'
import { SearchMenuModel } from '../ui/search/search-menu.model'
import { Tag } from '../../model/tag.model'
import {
  CardContentModel,
  ChartContentModel,
  CardMetadataModel,
  MetricEffect,
  MetricInfo
} from '../ui/card/card-content.model';

import { ChartOptions } from '../../model/chart-options.model'
import { CardModel } from '../ui/card/card.model';
import { DashboardModel } from './dashboard.model';
import { CardContentBuilder } from '../ui/card/card-content.component';
import { Customer, CustomerModel, CustomerDatapoint } from '../../model/customer.model';
import { BarChartContentBuilder } from '../ui/chart/bar-chart.component';
import { PieChartContentBuilder } from '../ui/chart/pie-chart.component';
import { SearchMenuComponent} from '../ui/search/search-menu.component';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';


/**
 * This component represents the dashboard page (routed to `/dashboard`)
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardModel: DashboardModel = {
    chartOptions: []
  };

  selectedCustomerModel: CustomerModel = {
    data: {
      datapoints: [],
      feedbacks: []
    }
  };


  loading = false;
  returnUrl: string;
  toggled = false;

  barchartComponentFactory: ComponentFactory<any>;

  @ViewChild('barchartTemplate') barchartTemplate: TemplateRef<any>;

  /**
   * Map of chart type name to ComponentFactory
   */
  private chartBuilders: { [key: string]: CardContentBuilder; } = {};

  @ViewChild('searchMenu') searchMenuComponent: SearchMenuComponent;

  private cardContentModelCache: Map<CustomerDatapoint, CardContentModel> = new Map();
  private cardModelCache: Map<CustomerDatapoint, CardModel> = new Map();
  private tagsCache: Map<CustomerDatapoint, Tag[]> = new Map();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private dashboardDataService: DashboardDataService,
    private componentFactoryResolver: ComponentFactoryResolver) {

    // Add Chart Type here
    this.chartBuilders['barChart'] = new BarChartContentBuilder(componentFactoryResolver);
    this.chartBuilders['pieChart'] = new PieChartContentBuilder(componentFactoryResolver);
  }

  public getContentBuilder(builderId: string): CardContentBuilder {
    return this.chartBuilders[builderId];
  }


  public refreshCustomerSelection() {
    this.selectedCustomerModel = this.searchMenuComponent.model.selectedCustomerModels[0];
  }

  /**
   * Extracts an array of Tag instances from a CustomerDatapoint instance.
   */
  public getTagsFromCustomerDatapoint(dataPoint: CustomerDatapoint): Tag[] {
    let tags: Tag[];

    if (this.tagsCache.has(dataPoint)) {
      return this.tagsCache.get(dataPoint);
    }

    // cache this puppy
    tags = [];
    this.tagsCache.set(dataPoint, tags);

    dataPoint.tagIds.map(tagId =>
      Array.prototype.push.apply(tags,
        this.searchMenuComponent.model.tags.filter(tag => tag.id === tagId)));

    if (tags.length < 1) {
      console.error('no tags were in datapoint: ', dataPoint.title);
    }

    return tags;
  }

  /**
   * Handles the tag selection of a card Item
   */
  onCardTagSelected(tagId : number) : void {
    // reset to this tag
    console.log("Tag Id is " , tagId);
    this.searchMenuComponent.onTagSelectionChange([tagId]);
  }

  /**
   * Handles the tag selection change of the stationery tag bar.
   */
  onTagBarSelectionChange(tags: Tag[]): void {

  }
  /**
   * When the customer selection is changed, we repopulate the models.
   */
  onCustomerSelectionChanged(customers: Customer[]): void {
    this.clearCache();

    if (customers.length > 0) {
      let customer: Customer = customers[0];
      let customerDataTask: Observable<CustomerModel> = this.dashboardDataService.loadCustomerData(customer.dataUrl);
      const subscription = customerDataTask.subscribe(customerModel => {
        this.searchMenuComponent.model.selectedCustomerModels = [customerModel];
        this.refreshCustomerSelection()
        subscription.unsubscribe();
      });
    }
  }

  /**
   * Open and close the dashboard search menu
   */
  handleMenuToggle() {
    this.toggled = !this.toggled;
  }


  /**
   * ngOnInit - description
   */
  ngOnInit(): void {
    this.refresh()
  }

  /**
   * Filter the datapoints based on the tags selection.
   */
  filterCustomerDatapoints(datapoints: CustomerDatapoint[]) {
    return datapoints.filter(dataPoint => {
      let isMatch = false;
      let selectedTags: Tag[] = this.searchMenuComponent.model.selectedTags;

      if (selectedTags.length > 0) {
        isMatch = false;
        dataPoint.tagIds.map(tagId => {
          selectedTags.map(tag => {
            if (!isMatch && tag.id === tagId) {
              isMatch = true;
            }
          })
        });
      } else {
        isMatch = true;
      }

      return isMatch;
    });
  }

  /**
   * Refresh the dashboard data source.
   */
  refresh() {
    this.clearCache();
    // fetch tags and customers
    let tagsTask: Observable<Tag[]> = this.dashboardDataService.loadTags();
    let customersTask: Observable<Customer[]> = this.dashboardDataService.loadCustomers();
    let chartOptionsTask: Observable<ChartOptions[]> = this.dashboardDataService.loadChartOptions();

    const tagsSubscription = tagsTask.subscribe(tags => {
      this.searchMenuComponent.model.tags = tags;
      tagsSubscription.unsubscribe();
    });

    const custSubscription = customersTask.subscribe(customers => {
      this.searchMenuComponent.model.customers = customers;
      custSubscription.unsubscribe();
    });

    const chartOptsSubscription = chartOptionsTask.subscribe(options => {
      this.dashboardModel.chartOptions = options;
      chartOptsSubscription.unsubscribe();
    });
  }

  /**
   * Build a CardModel out of the CustomerDatapoint. Called by view bindings
   * so we cache the result value against the source data point to avoid unneccessary object creation
   */
  buildCardModel(dataPoint: CustomerDatapoint) {
    if (this.cardModelCache.has(dataPoint)) {
      return this.cardModelCache.get(dataPoint);
    }

    let cardModel: CardModel = {
      title: dataPoint.title,
      tags: this.getTagsFromCustomerDatapoint(dataPoint),
      contentModel: this.buildCardContentModel(dataPoint)
    }

    this.cardModelCache.set(dataPoint, cardModel);

    return cardModel;
  }

  /**
   * Builds the Card Content Metadata the will power the widgets outside the perview
   * of the Chart Rendering. (I.e. Metric Effect)
   */
  buildCardMetadataModel(datapoint: CustomerDatapoint): CardMetadataModel {
    let cardMetadataModel: CardMetadataModel = {
      metricInfo: {
        title: datapoint.content.metadata.title,
        text: datapoint.content.metadata.text,
      },
      metricEffect: {
        effect: datapoint.content.metadata.metricEffect.effect,
        effectValue: datapoint.content.metadata.metricEffect.effectValue
      }
    };


    return cardMetadataModel;
  }

  /**
   * Builds the card content model which will also include its source view template.
   * This method is called from the view when passing its data into each card for the
   * current customer's Data points. Called by view bindings
   * so we cache the result value against the source data point to avoid unneccessary object creation
   */
  buildCardContentModel(datapoint: CustomerDatapoint): CardContentModel {
    if (this.cardContentModelCache.has(datapoint)) {
      return <ChartContentModel>this.cardContentModelCache.get(datapoint);
    }

    // here we simply change wrapper types. We don't do any further 'formatting'
    // of the content data so that we're not tied to something specific.
    // the card content builder mechanism can own that logic.
    let cardContentModel: ChartContentModel = {
      cardContentMetadata: this.buildCardMetadataModel(datapoint),
      cardContentData: datapoint.content.data,
      chartType: datapoint.content.type,
      chartOptions: this.getChartOptionsFromCustomerDatapoint(datapoint)
    }

    this.cardContentModelCache.set(datapoint, cardContentModel);
    return cardContentModel;
  }

  public getChartOptionsFromCustomerDatapoint(datapoint: CustomerDatapoint): ChartOptions {
    // let chartOptionId : string = datapoint.
    let chartOptionsId: string = datapoint.content.data.chartOptionsId;
    let matches: ChartOptions[] = this.dashboardModel.chartOptions.filter(options => options.id === chartOptionsId);
    return matches.length > 0 ? matches[0] : null;
  }

  public clearCache() {
    this.cardModelCache.clear();
    this.cardContentModelCache.clear();
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(success => {
        this.router.navigate(['/']);
      });
  }

  ngOnDestroy(): void {
    this.clearCache();
  }
}
