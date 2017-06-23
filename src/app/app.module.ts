import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './components/login/login.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchMenuComponent } from './components/ui/search/search-menu.component';
import { TagBarComponent } from './components/ui/tagbar/tagbar.component'
import { TagBarItemComponent } from './components/ui/tagbar/tagbar-item.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';
import { AuthenticationService } from './services/authentication.service'
import { DashboardDataService } from './services/dashboard/dashboarddata.service'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';


@NgModule({
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SearchMenuComponent,
    TagBarComponent,
    TagBarItemComponent
  ],
  // Add services and data providers here
  // this is used for Injectable items which will
  // be injected into components that request it.
  providers: [
    AuthenticationService,
    DashboardDataService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
