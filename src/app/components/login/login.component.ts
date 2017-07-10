import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  private account: Object;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService)
  { }

  onSubmit(event: Event) {

    event.preventDefault();
    this.login();
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(success => {
        this.router.navigate(['/']);
      });
  }
  /**
   * Submit login credentials
   */
  login() {
    this.authenticationService.login(this.model.email, this.model.password)
      .subscribe(success => {
        this.router.navigate(['/dashboard']);
      });

  }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // check cookies for previous login
    // login (oauth?)
    // $('.message a').click(function(){
    //    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    // });
  }

}
