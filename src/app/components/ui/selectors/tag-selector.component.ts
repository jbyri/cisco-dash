import { Input, Output, Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { TagSelectorModel } from '../../../model/tag-selector.model'
import { Tag } from '../../../model/tag.model'
import { Utils } from '../../../services/utils/utils.component'
@Component({
  selector: 'tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css']
})
export class TagSelectorComponent {
  constructor(private utils : Utils) {

  }

  @Input() model : TagSelectorModel

  // output when clicked
  @Output()
  selectionChanged : EventEmitter<Tag[]> = new EventEmitter<Tag[]>();

  onSelect(event : any) : void {
    console.log("tagSelector::onSelect() - ", event);
    let selectedTags = this.utils.getSelected(event);
    this.selectionChanged.emit(<Tag[]>selectedTags);
  }
}
