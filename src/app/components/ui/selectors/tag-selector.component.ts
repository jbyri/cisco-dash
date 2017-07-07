import { Input, Output, Component, EventEmitter } from '@angular/core';
import { TagSelectorModel } from './tag-selector.model'
import { Tag } from '../../../model/tag.model'
import { Utils } from '../../../services/utils/utils.component'
@Component({
  selector: 'tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css']
})
export class TagSelectorComponent {

  @Input()
  model: TagSelectorModel;

  // output when clicked
  @Output()
  selectionChanged: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();

  constructor(private utils: Utils) {

  }

  onSelect(event: any): void {
    console.log('tagSelector::onSelect() - ', event);
    let selectedTags = this.utils.getSelectedValues(event.options);
    this.selectionChanged.emit(<Tag[]>selectedTags);
  }
}
