import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { DashboardDataService } from '../../services/dashboard/dashboarddata.service'
import { SearchMenuModel } from '../../model/search-menu.model'
import { Tag } from '../../model/tag.model'
import { Customer, CustomerModel } from '../../model/customer.model'
import { TagBarComponent } from '../ui/tagbar/tagbar.component'
import { SearchMenuComponent} from '../ui/search/search-menu.component'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  model:any = {};
  searchMenuModel : SearchMenuModel =  {
    config : {
      maxSelectableTags : 3,
      maxSelectableCustomers : 1
    },
    customers : [],
    selectedCustomers: [],
    selectedCustomerModels : [],
    tags : [],
    dataSelection : []
  };

  loading = false;
  returnUrl: string;

  private account : Object;

  @ViewChild('searchMenu') searchMenuComponent : SearchMenuComponent;


  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private authenticationService:AuthenticationService,
    private dashboardDataService : DashboardDataService ) {
    console.log("Dashboard Component", route, router, authenticationService, dashboardDataService);

  }

  ngOnInit() {
    // fetch tags and customers
    let tagsTask: Observable<Tag[]> = this.dashboardDataService.loadTags();
    let customersTask: Observable<Customer[]> = this.dashboardDataService.loadCustomers();

    // check cookies for previous login
    // login (oauth?)
    // $('.message a').click(function(){
    //    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    // });
    tagsTask.subscribe(tags => {
      this.searchMenuModel.tags = tags;
    });

    customersTask.subscribe(customers => {
      this.searchMenuModel.customers = customers;
    });
  }


    ngOnDestroy() {
      
    }

    ngDoCheck() {

    }
}
