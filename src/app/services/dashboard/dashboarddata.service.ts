import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Tag } from '../../model/tag.model'
import { Customer, CustomerModel } from '../../model/customer.model'
import { ChartOptions } from '../../model/chart-options.model'



/**
 * This class is the main Data Service for the Dashboard. Its responsible for
 * loading Tags, Customers, and detailed Customer Models which will fuel the
 * Dashboard UI
 */
@Injectable()
export class DashboardDataService {
  // set this to true if you need to format tag data
  // incoming from cisco
  // TODO @wnamen change this to true if the server containing the
  // tagsEndpoint returns a format that needs to be coerced into a
  // collection of Tag
  private needsTagCoersion = false;

  // TODO @wnamen change this to call the cisco server endpoint
  private tagsEndpoint = '/app/assets/data/tags.json';
  // TODO @wnamen change this to true if the server containing the
  // customerDataEndpoint returns a format that needs to be coerced into a
  // collection of Customer
  private needsCustomerDataCoersion = false;
  // TODO @wnamen change this to call the cisco server endpoint for customer data
  private customerDataEndpoint = '/app/assets/data/customers.json';


  private chartOptionsEndpoint = '/app/assets/data/chart-options.json'

  // the currently selected customer
  private customerModel: CustomerModel;

  constructor(private http: Http) {
    console.debug('DashboardDataService Construct');
  }

  // formats some tag data from Ciscos Secret Server
  // into a set of Tag[] which we need to fuel our UI
  private formatTagData(json: object): Tag[] {
    let tagList: Tag[];
    // if the other data is an array type
    // assume its a list of tag like objects which
    // may just need direct mapping
    if (Array.isArray(json)) {
      tagList = [];
      let otherFormattedTagList: Object[] = json;
      otherFormattedTagList.forEach(tagObject => {
        // TODO @wnamen if formatting tag data, translate the other data into a list of tags
        // FIXME @wnamen change this statement to be the proper translation format
        tagList[tagList.length] = {
          name: tagObject['otherNameProp'],
          label: tagObject['otherDisplayNameProp'],
          id: tagList.length
        };
      });
    } else {
      // TODO @wnamen, do whatever parsing of the data is necessary to build a list of Tag
      // FIXME @wnamen change this statement to be the proper translation format
      tagList[0] = {
        name: json['otherNameProp'],
        label: json['otherDisplayNameProp'],
        id: 0
      };
    }

    return tagList;
  }

  // formats arbitrary customer list data into Customer[]
  // data which we need to fuel our UI
  private formatCustomersData(json: object): Customer[] {
    let customers: Customer[];
    // if the other data is an array type
    // assume its a list of tag like objects which
    // may just need direct mapping
    if (Array.isArray(json)) {
      customers = [];
      let otherFormattedTagList: Object[] = json;
      otherFormattedTagList.forEach(customerObject => {
        // TODO @wnamen if formatting customer data, translate the other data into a list of tags
        // FIXME @wnamen change this statement to be the proper translation format
        customers[customers.length] = {
          name: customerObject['otherNameProp'],
          displayName: customerObject['otherDisplayNameProp'],
          dataUrl: customerObject['otherDataUrl']
        }
      });
    } else {
      // TODO @wnamen, do whatever parsing of the data is necessary to build a list of Tag
      // FIXME @wnamen change this statement to be the proper translation format
      customers[0] = {
        name: json['otherNameProp'],
        displayName: json['otherDisplayNameProp'],
        dataUrl: json['otherDataUrl']
      };
    }

    return customers;
  }

  loadTags(): Observable<Tag[]> {
    console.debug('loadTags');
    // TODO @wnamen - if we ever need to load this data from another service modify
    // the call here. It will likely be a RESTful or basic HTTP GET request.
    let tagsTask: Observable<Tag[]> = this.http.get(this.tagsEndpoint)
      .map((response: Response) => {
        let tagList: Tag[];

        if (this.needsTagCoersion) {
          // TODO @wnamen if the data needs to be coerced here is where that would happen
          tagList = this.formatTagData(response.json());
        } else {
          tagList = response.json();
        }

        return tagList;
      });


    return tagsTask;
  }

  /**
   * load the customer data.
   */
  loadCustomers(): Observable<Customer[]> {
    console.debug('loadCustomers()');
    let customersTask: Observable<Customer[]> = this.http.get(this.customerDataEndpoint)
      .map((response: Response) => {
        let customers: Customer[];
        if (this.needsCustomerDataCoersion) {
          // TODO @wnamen if the data needs to be coerced here is where that would happen
          customers = this.formatCustomersData(response.json());
        } else {
          customers = response.json();
        }

        return customers;
      });

    return customersTask;
  }

  loadChartOptions(): Observable<ChartOptions[]> {
    let chartOptionsTask: Observable<ChartOptions[]> = this.http.get(this.chartOptionsEndpoint)
      .map((response: Response) => {
        let chartOptions: ChartOptions[];
        // TODO @wnamen if the data needs to be coerced here is where that would happen
        chartOptions = response.json();
        console.log('ChartOptions Data:', chartOptions);

        return chartOptions;
      });

    return chartOptionsTask;
  }

  /**
   * Loads the data for a specific customer from the customerDataUrl
   * the data url can be a local file, or an http endpoint using GET
   */
  loadCustomerData(customerDataUrl: string): Observable<CustomerModel> {
    console.log('loadCustomerData(' + customerDataUrl + ')');
    return this.http.get(customerDataUrl)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let dashboardData = response.json();
        console.log('CustomerModel Data:', dashboardData);
        return dashboardData;
      });
  }
}
