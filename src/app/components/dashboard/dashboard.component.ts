import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  model:any = {};
  loading = false;
  returnUrl: string;

  private account : Object;

  constructor(private route: ActivatedRoute, private router:Router, private authenticationService:AuthenticationService) {
    console.log("Dashboard Component", route, router, authenticationService);
  }

  ngOnInit() {

    console.log("DashboardComponent::ngOnInit()");
    // check cookies for previous login
    // login (oauth?)
    // $('.message a').click(function(){
    //    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    // });
  }

}
