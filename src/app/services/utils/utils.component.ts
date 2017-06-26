import {Injectable, ElementRef} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class Utils {
  constructor(private http: Http) {

  }

  getSelected(list: any): object[] {
    let options = [];
    for (var i = 0; i < list.options.length; i++) {
      var optionElement = list.options[i];
      if (optionElement.selected == true) {
        options[options.length] = optionElement.value;
      }
    }
    console.log("Selected OPtions: ", options);

    return options;
  }
}
