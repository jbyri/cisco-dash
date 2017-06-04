import { Component, OnInit } from '@angular/core';


import 'rxjs/add/operator/map'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private account : Object;

  constructor() {

  }

  logout() {


  }
  /**
   * Submit login credentials
   */
  login() {
    
  }

  ngOnInit() {
    console.log("LoginComponent::ngOnInit()");
    // check cookies for previous login
    // login (oauth?)
    // $('.message a').click(function(){
    //    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    // });
  }

}
