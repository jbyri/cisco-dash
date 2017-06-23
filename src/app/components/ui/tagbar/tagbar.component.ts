import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagBarModel, TagBarItemModel } from '../../../model/tagbar.model'

import 'rxjs/add/operator/map'

@Component({
  selector: 'tagbar',
  templateUrl: './tagbar.component.html',
  styleUrls: ['./tagbar.component.css']
})
export class TagBarComponent implements OnInit {
  model:TagBarModel = {
    dataProvider : []
  };

  constructor(
    private route: ActivatedRoute,
    private router:Router) {
    console.log("TagBarComponent", route, router);
  }

  ngOnInit() {
    console.log("TagBarComponent::ngOnInit()");
  }
}
