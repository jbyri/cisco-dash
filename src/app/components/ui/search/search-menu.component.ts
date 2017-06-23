import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchMenuModel } from '../../../model/search-menu.model';

import 'rxjs/add/operator/map'


@Component({
  selector: 'search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.css']
})
export class SearchMenuComponent implements OnInit {
  model:SearchMenuModel = {
    customers : [],
    customerModel : null,
    tags : [],
    dataSelection : []
  };

  constructor(
    private route: ActivatedRoute,
    private router:Router) {
    console.log("SearchMenuComponent", route, router);
  }

  ngOnInit() {
    console.log("SearchMenuComponent::ngOnInit()");
  }
}
