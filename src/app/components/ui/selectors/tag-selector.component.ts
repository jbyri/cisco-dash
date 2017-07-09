import { Input, Output, Component, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TagSelectorModel } from './tag-selector.model'
import { Tag } from '../../../model/tag.model'
import { Utils } from '../../../services/utils/utils.component'
@Component({
  selector: 'tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css']
})
export class TagSelectorComponent {


  model: TagSelectorModel = {
    tags: []
  };

  // gate for circular emission
  emittingSelectionChange: boolean = false;

  // output when clicked
  @Output()
  selectionChanged: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();

  @ViewChild('selector')
  selector: ElementRef;

  constructor(private utils: Utils) {

  }

  clearSelection() {
    this.utils.clearSelection(<HTMLSelectElement>this.selector.nativeElement);
  }

  public setSelectedElements(selectedElements: any[]) {
    this.utils.setSelection(<HTMLSelectElement>this.selector.nativeElement, selectedElements);
  }

  onSelect(selectElement: any): void {
    let selectedTags = this.utils.getSelectedValues(selectElement.options);
    if (!this.emittingSelectionChange) {
      this.emittingSelectionChange = true;
      this.selectionChanged.emit(<Tag[]>selectedTags);
      this.emittingSelectionChange = false;
    }
  }
}
