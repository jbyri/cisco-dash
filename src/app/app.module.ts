import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CardComponent } from './components/ui/card/card.component';
import { CardContentComponent } from './components/ui/card/card-content.component';
import { CustomerSelectorComponent } from './components/ui/selectors/customer-selector.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component'
import { SearchMenuComponent } from './components/ui/search/search-menu.component';
import { TagBarComponent } from './components/ui/tagbar/tagbar.component'
import { TagBarItemComponent } from './components/ui/tagbar/tagbar-item.component'
import { TagSelectorComponent } from './components/ui/selectors/tag-selector.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';
import { AuthenticationService } from './services/authentication.service'
import { DashboardDataService } from './services/dashboard/dashboarddata.service'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { Utils } from './services/utils/utils.component'


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
    CardComponent,
    CardContentComponent,
    CustomerSelectorComponent,
    DashboardComponent,
    LoginComponent,
    SearchMenuComponent,
    TagBarComponent,
    TagBarItemComponent,
    TagSelectorComponent
  ],
  // Add services and data providers here
  // this is used for Injectable items which will
  // be injected into components that request it.
  providers: [
    Utils,
    AuthenticationService,
    DashboardDataService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
