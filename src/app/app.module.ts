import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './components/login/login.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';

@NgModule({
imports: [
  BrowserModule,
  AppRoutingModule,
  HttpModule
],
  declarations: [ AppComponent, LoginComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
