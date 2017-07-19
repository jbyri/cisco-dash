import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  model:any = {};
  loading = false;
  returnUrl: string;

  private account : Object;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService)
  { }

  onSubmit(event : Event) {
    console.log("onSubmit");
    event.preventDefault();
    this.signup();
  }

  /**
   * Submit login credentials
   */
  signup() {
    this.authenticationService.signup(this.model.firstName, this.model.lastName, this.model.email, this.model.password)
      .subscribe(success => {
        console.log("SignUp Successs!");
        this.router.navigate(['/dashboard']);
      });

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    console.log("SignUpComponent::ngOnInit()");
    // check cookies for previous login
    // login (oauth?)
    // $('.message a').click(function(){
    //    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    // });
  }

}
