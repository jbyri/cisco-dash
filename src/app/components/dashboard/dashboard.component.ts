import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { DashboardDataService } from '../../services/dashboard/dashboarddata.service'
import { SearchMenuModel } from '../../model/search-menu.model'

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

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private authenticationService:AuthenticationService,
    private dashboardDataService : DashboardDataService ) {
    console.log("Dashboard Component", route, router, authenticationService, dashboardDataService);
  }

  ngOnInit() {
    console.log("DashboardComponent::ngOnInit()");
    // check cookies for previous login
    // login (oauth?)
    // $('.message a').click(function(){
    //    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    // });
  }


    ngOnDestroy() {
      console.log("SearchMenuComponent::ngOnDestroy()");
    }

    ngDoCheck() {
      console.log("SearchMenuComponent::ngDoCheck()");
    }

    ngAfterViewChecked() {
      // console.log("SearchMenuComponent::ngAfterViewChecked()");
    }
    ngAfterViewInit() {
      // console.log("SearchMenuComponent::ngAfterViewInit()");
    }

    ngAfterContentInit() {
      // console.log("SearchMenuComponent::ngAfterContentInit()");
    }
    ngAfterContentChecked() {
      // console.log("SearchMenuComponent::ngAfterContentChecked()");
    }
}
