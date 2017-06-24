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
export class TagBarComponent implements OnInit, OnChanges {
  @Input()
  model:TagBarModel = {
    nextTagInput : "",
    sourceData : [
      {
        content : "Unilever"
      },
      {
        content : "FIN"
      },
      {
        content : "TAC"
      }
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
    console.log("tryAddingTag", lwrValue);
    let result = this.model
                  .sourceData
                  .filter(eachSource =>eachSource.content.toLowerCase() === lwrValue)
                  .map(matchedSource => {
                    console.log("matched source", matchedSource);
                    let matchingItems = this.model.dataProvider.filter(eachData => eachData.content.toLowerCase() === lwrValue);

                    return matchingItems.length === 0 ? this.model.dataProvider.push(matchedSource) : null;
                  });

    console.log("result", result);
    this.model.nextTagInput = "";
  }
  onTagbarSearchNextTag(event : any) {
    if(event.target.value != null && event.target.value !== "") {
      this.tryAddingTag(event.target.value.toLowerCase());
      event.target.value = "";
    }
  }
  onTagbarSearchInput(event : any) {
    console.log("onTagbarSearchInput", event);
    if(this.model.dataProvider.length > 0) {
      // if we're deleting nothing, remove the previous tag.
      if(event.key === "Backspace" || event.key === "Delete") {
        if(this.model.nextTagInput === "" && event.target.value === "") {
          // remove the last tag
          this.model.dataProvider.pop();
        }
      }
    }

    // add the current text (as a tag if it exists in the source)
    if(event.code === "Space") {
      this.tryAddingTag(event.target.value.toLowerCase());
    }

    this.model.nextTagInput = event.target.value;
  }
  /**
   * Removes an item from the tag bar
   */
  onTagBarItemClicked(tagBarModel : TagBarItemModel) {
    console.log("onTagBarItemClicked", tagBarModel);
    let index = this.model.dataProvider.indexOf(tagBarModel);

    if(index > -1) {
      this.model.dataProvider.splice(index, 1);
    }
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnInit() {

  }
}
