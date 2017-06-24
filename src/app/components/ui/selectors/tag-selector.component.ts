import { Input, Output, Component, OnInit, ViewChild } from '@angular/core';
import { TagSelectorModel } from '../../../model/tag-selector.model'


@Component({
  selector: 'tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css']
})
export class TagSelectorComponent {
  @Input() model : TagSelectorModel
}
