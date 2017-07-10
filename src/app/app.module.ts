// Angular Imports.
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule }      from '@angular/core';

// Application imports
import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

// bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Services
import { AuthenticationService } from './services/authentication.service'
import { DashboardDataService } from './services/dashboard/dashboarddata.service'
import { Utils } from './services/utils/utils.component'

// UI Components
import { BarChartComponent } from './components/ui/chart/bar-chart.component';
import { PieChartComponent } from './components/ui/chart/pie-chart.component';
import { CardComponent } from './components/ui/card/card.component';
import { CardContentComponent } from './components/ui/card/card-content.component';
import { CustomerSelectorComponent, CustomerFilterPipe } from './components/ui/selectors/customer-selector.component'
import { SearchMenuComponent } from './components/ui/search/search-menu.component';
import { SignUpComponent } from './components/signup/signup.component';
import { TagBarComponent } from './components/ui/tagbar/tagbar.component';
import { TagBarItemComponent } from './components/ui/tagbar/tagbar-item.component';
import { TagSelectorComponent } from './components/ui/selectors/tag-selector.component';

// Route handling components.
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
    BarChartComponent,
    PieChartComponent,
    CardComponent,
    CardContentComponent,
    CustomerSelectorComponent,
    DashboardComponent,
    LoginComponent,
    SignUpComponent,
    SearchMenuComponent,
    TagBarComponent,
    TagBarItemComponent,
    TagSelectorComponent,
    CustomerFilterPipe
  ],
  // Add services and data providers here
  // this is used for Injectable items which will
  // be injected into components that request it.
  providers: [
    Utils,
    AuthenticationService,
    DashboardDataService
  ],
  entryComponents: [
    BarChartComponent,
    PieChartComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
