import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import 'rxjs/add/operator/map'

export interface TagBarModel {

}

@Component({
  selector: 'tagbar-item',
  templateUrl: './tagbar-item.component.html',
  styleUrls: ['./tagbar-item.component.css']
})
export class TagBarItemComponent implements OnInit {
  model:TagBarModel = {

  };

  constructor(
    private route: ActivatedRoute,
    private router:Router) {
    console.log("TagBarItemComponent", route, router);
  }

  ngOnInit() {
    console.log("TagBarItemComponent::ngOnInit()");
  }
}
