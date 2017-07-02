import {Injectable, ElementRef} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class Charts {
  constructor(private http: Http) {
    console.log("charts.construct()");
  }


  public newChart(chartType : string, chartData : any) : any {

  }
}
