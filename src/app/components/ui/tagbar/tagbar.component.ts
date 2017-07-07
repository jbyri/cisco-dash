import { Input, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagBarModel, TagBarItemModel } from './tagbar.model'
import 'rxjs/add/operator/map'

@Component({
  selector: 'tagbar',
  templateUrl: './tagbar.component.html',
  styleUrls: ['./tagbar.component.css']
})
export class TagBarComponent implements OnInit {
  @Input()
  model: TagBarModel = {
    nextTagInput: '',
    sourceData: [

    ],
    dataProvider: [

    ]
  };

  public placholderLabel = 'thing';

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  tryRemovingTag(lwrValue: string, force: boolean): void {

    let index = -1;
    this.model.dataProvider.map(eachSource => {
      if (eachSource.enabled || force) {
        let eachLwr = eachSource.content.toLowerCase()
        if (eachLwr === lwrValue || eachLwr.indexOf(lwrValue) > -1) {
          index = this.model.dataProvider.indexOf(eachSource);
        }

        if (index > -1) {
          this.model.dataProvider.splice(index, 1);
        }
      }
    });
  }
  tryAddingTag(lwrValue: string) {
    this.model
      .sourceData
      .filter(eachSource => {
        let eachLwr = eachSource.content.toLowerCase();
        return eachLwr === lwrValue || eachLwr.indexOf(lwrValue) > -1;
      })
      .map(matchedSource => {
        let matchingItems = this.model.dataProvider.filter(eachData => eachData.content.toLowerCase() === lwrValue);
        return matchingItems.length === 0 ? this.model.dataProvider.push(matchedSource) : null;
      });

    this.model.nextTagInput = '';
  }


  tryAddingTagFromInput(input: any): boolean {
    if (input.value != null && input.value !== '') {
      this.tryAddingTag(input.value.toLowerCase());
      input.value = '';
      input.focus();
      return true;
    }

    return false;
  }

  onTagbarSearchNextTag(event: any): void {
    this.tryAddingTagFromInput(event.target);
  }

  onTagbarSearchClear(event: any) {
    if (event.code === 'Tab') {
      event.target.value = '';
    }
  }
  onTagbarSearchInput(event: any): void {
    if (event.code === 'Tab') {
      return;
    } else {
      if (this.model.dataProvider.length > 0) {
        let endTag: TagBarItemModel = this.model.dataProvider[this.model.dataProvider.length - 1];
        if (endTag.enabled) {
          // if we're deleting nothing, remove the previous tag.
          if (event.code === 'Backspace' || event.code === 'Delete') {
            if (this.model.nextTagInput === '' && event.target.value === '') {
              // remove the last tag
              this.model.dataProvider.pop();
              event.target.focus();
            }
          }
        }
      }

      // add the current text (as a tag if it exists in the source)
      if (event.code === 'Space') {
        event.target.value = this.model.nextTagInput;
        this.tryAddingTagFromInput(event.target);
      } else if (event.code === 'Escape') {
        event.target.value = '';
        event.target.blur();
      }

      this.model.nextTagInput = event.target.value;
    }
  }
  /**
   * Removes an item from the tag bar
   */
  onTagBarItemClicked(tagBarModel: TagBarItemModel): void {
    if (tagBarModel.enabled) {
      let index = this.model.dataProvider.indexOf(tagBarModel);
      if (index > -1) {
        this.model.dataProvider.splice(index, 1);
      }
    }
  }

  ngOnInit() {

  }
}
