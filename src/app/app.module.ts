import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './components/login/login.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';
import { AuthenticationService } from './services/authentication.service'
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
  declarations: [ AppComponent, LoginComponent, DashboardComponent ],
  providers: [ AuthenticationService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
