import {Injectable, ElementRef} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class Utils {
  constructor(private http: Http) {

  }

  // Element Utilites
  //
  // Returns the list selected item values for a given
  // select element.
  getSelectedValues(optionElements: any[]): object[] {
    let options = [];
    for (var i = 0; i < optionElements.length; i++) {
      var optionElement = optionElements[i];
      if (optionElement.selected == true) {
        options[options.length] = optionElement.value;
      }
    }

    return options;
  }
}
