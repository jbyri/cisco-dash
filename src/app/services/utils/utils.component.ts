import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class Utils {
  constructor(private http: Http) {

  }

  // Element Utilites
  //
  // Returns the list selected item values for a given
  // select element.
  getSelectedValues(optionElements: HTMLOptionElement[]): any[] {
    let options = [];
    for (let i = 0; i < optionElements.length; i++) {
      let optionElement = optionElements[i];
      if (optionElement.selected === true) {
        options[options.length] = optionElement.value;
      }
    }

    return options;
  }


  /**
   * setSelection - Sets the elements that are selected by passing in a subset of
   * "selected" elements that also exist in the data provider.
   *
   * @param  {HTMLSelectElement} selectElement : HTMLSelectElement the HTML Element <select>
   * @param  {any[]} selection: any[]                  selected values used to trigger the selection
   */
  setSelection(selectElement: HTMLSelectElement, selection: any[]): void {
    this.clearSelection(selectElement);

    for (let i = 0; i < selection.length; i++) {
      let options: HTMLOptionsCollection = selectElement.options;
      let selected = selection[i];

      for (let j = 0; j < options.length; j++) {
        let option: HTMLOptionElement = options.item(j);
        // normalize a and b to integer if they are string types and fail the NaN check.
        let a = (typeof (option.value) === 'string' && !isNaN(parseInt(option.value))) ? parseInt(option.value) : option.value;
        let b = (typeof (selected) === 'string' && !isNaN(parseInt(selected))) ? parseInt(selected) : selected;

        // compare the normalized values.
        if (a === b) {
          option.selected = true;
        }
      }
    }
  }


  /**
   * Clear the current selectionChanged
   * @param {HTMLSelectElement} selectElement :  HTMLSelectElement the Select element we wish to clear.
   */
  clearSelection(selectElement: HTMLSelectElement): void {
    let options: HTMLOptionsCollection = selectElement.options;
    for (let j = 0; j < options.length; j++) {
      let option: HTMLOptionElement = options.item(j);
      if (option.selected == true) {
        option.selected = false;
      }
    }
  }
}
