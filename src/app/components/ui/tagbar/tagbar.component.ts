import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagBarModel, TagBarItemModel } from './tagbar.model'


import 'rxjs/add/operator/map'

@Component({
  selector: 'tagbar',
  templateUrl: './tagbar.component.html',
  styleUrls: ['./tagbar.component.css']
})
export class TagBarComponent implements OnInit {

  model: TagBarModel = {
    nextTagInput: '',
    sourceData: [],
    placholderText: "",
    dataProvider: []
  };

  emittingTagsRemoved: boolean = false;
  emittingTagsAdded: boolean = false;
  emittingTagsChanged: boolean = false;
  @Output()
  tagsRemoved: EventEmitter<TagBarItemModel[]> = new EventEmitter<TagBarItemModel[]>();

  @Output()
  tagsAdded: EventEmitter<TagBarItemModel[]> = new EventEmitter<TagBarItemModel[]>();

  @Output()
  tagsChanged: EventEmitter<TagBarItemModel[]> = new EventEmitter<TagBarItemModel[]>();

  public placholderLabel = 'thing';

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  emitTagsChanged() {
    if (!this.emittingTagsChanged) {
      this.emittingTagsChanged = true;
      this.tagsChanged.emit(this.model.dataProvider);
      this.emittingTagsChanged = false;
    }
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
          let removed: TagBarItemModel[] = this.model.dataProvider.splice(index, 1);
          if (!this.emittingTagsRemoved) {
            this.emittingTagsRemoved = true;
            this.tagsRemoved.emit(removed);
            this.emittingTagsRemoved = false;
          }

          this.emitTagsChanged();
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
        let result = matchingItems.length === 0 ? this.model.dataProvider.push(matchedSource) : null;

        if (result != null) {
          let added: TagBarItemModel[] = [matchedSource];
          if (!this.emittingTagsAdded) {
            this.emittingTagsAdded = true;
            this.tagsAdded.emit(added);
            this.emittingTagsAdded = false;
          }

          this.emitTagsChanged();
        }
        return result;
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
              let lastItem = this.model.dataProvider.pop();
              let removed: TagBarItemModel[] = [lastItem]
              if (!this.emittingTagsRemoved) {
                this.emittingTagsRemoved = true;
                this.tagsRemoved.emit(removed);
                this.emittingTagsRemoved = false;
              }

              this.emitTagsChanged();
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
        let removedItems = this.model.dataProvider.splice(index, 1);
        if (!this.emittingTagsRemoved) {
          this.emittingTagsRemoved = true;
          this.tagsRemoved.emit(removedItems);
          this.emittingTagsRemoved = false;
        }
        this.emitTagsChanged();
      }
    }
  }

  ngOnInit() {

  }
}
