import { Input, Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagBarModel, TagBarItemModel } from '../../../model/tagbar.model'
import { TagBarItemComponent } from './tagbar-item.component'
import 'rxjs/add/operator/map'

@Component({
  selector: 'tagbar',
  templateUrl: './tagbar.component.html',
  styleUrls: ['./tagbar.component.css']
})
export class TagBarComponent implements OnInit {
  @Input()
  model:TagBarModel = {
    nextTagInput : "",
    sourceData : [

    ],
    dataProvider : [

    ]
  };

  public placholderLabel : string = "thing";

  constructor(
    private route: ActivatedRoute,
    private router:Router) {
    console.log("TagBarComponent", route, router);
  }

  tryAddingTag(lwrValue : string) {
    console.log(`tryAddingTag [${lwrValue}]`);
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

    this.model.nextTagInput = "";
  }

  tryAddingTagFromInput(input : any) : boolean{
    if(input.value != null && input.value !== "") {
      this.tryAddingTag(input.value.toLowerCase());
      input.value = "";
      input.focus();
      return true;
    }

    return false;
  }

  onTagbarSearchNextTag(event : any) : void {
    this.tryAddingTagFromInput(event.target);
  }

  onTagbarSearchClear(event: any) {
    if(event.code === "Tab") {
      event.target.value = "";
    }
  }
  onTagbarSearchInput(event : any) : void {
    console.log("onTagbarSearchInput", event);
    if(event.code === "Tab") {
      return;
    }

    if(this.model.dataProvider.length > 0) {
      // if we're deleting nothing, remove the previous tag.
      if(event.code === "Backspace" || event.code === "Delete") {
        if(this.model.nextTagInput === "" && event.target.value === "") {
          // remove the last tag
          this.model.dataProvider.pop();
          event.target.focus();
        }
      }
    }

    // add the current text (as a tag if it exists in the source)
    if(event.code === "Space") {
      event.target.value = this.model.nextTagInput;
      this.tryAddingTagFromInput(event.target);
    }

    if(event.code === "Escape") {
      console.log("event target", event.target);
      event.target.value = "";
      event.target.blur();
    }

    this.model.nextTagInput = event.target.value;
  }
  /**
   * Removes an item from the tag bar
   */
  onTagBarItemClicked(tagBarModel : TagBarItemModel) : void {
    console.log("onTagBarItemClicked", tagBarModel);
    let index = this.model.dataProvider.indexOf(tagBarModel);

    if(index > -1) {
      this.model.dataProvider.splice(index, 1);
    }
  }


  ngOnInit() {

  }
}
