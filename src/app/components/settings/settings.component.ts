import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from './settings.model';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User[] = [];
  loading = false;
  returnUrl: string;

  private account: Object;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService)
  { }

  logout() {
    this.authenticationService.logout()
      .subscribe(success => {
        this.router.navigate(['/']);
      });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.user = JSON.parse(localStorage.getItem('currentUser')).user;

    // check cookies for previous settings
    // settings (oauth?)
    // $('.message a').click(function(){
    //    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    // });
  }

}
