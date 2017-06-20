import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model:any = {};
  loading = false;
  returnUrl: string;

  private account : Object;

  constructor(private route: ActivatedRoute, private router:Router, private authenticationService:AuthenticationService) {
    console.log("Login Component", route, router, authenticationService);
  }

  onSubmit(event : Event) {
    console.log("onSubmit");
    event.preventDefault();
    this.login();
  }

  logout() {
    this.authenticationService.logout().then(success => {
      this.router.navigate(['/login']);
    });
  }
  /**
   * Submit login credentials
   */
  login() {
    this.authenticationService.login("nobody", "important").then(success => {
      console.log("Login Successs!");
      this.router.navigate(['/dashboard']);
    });

  }

  ngOnInit() {
    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    console.log("LoginComponent::ngOnInit()");
    // check cookies for previous login
    // login (oauth?)
    // $('.message a').click(function(){
    //    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    // });
  }

}
