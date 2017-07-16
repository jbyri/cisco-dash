export interface TagBarItemModel {
  content: string,
  tagId : number,
  enabled: boolean
}


export interface TagBarModel {
  nextTagInput: string,
  sourceData: TagBarItemModel[],
  placholderText : string,
  dataProvider: TagBarItemModel[]
}
