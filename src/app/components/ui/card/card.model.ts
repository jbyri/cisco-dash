import {Input} from '@angular/core'
import {CardContentModel} from './card-content.model';
import { Tag } from '../../../model/tag.model';

export interface CardModel {
  title : String
  tags : Tag[],
  contentModel : CardContentModel
}
