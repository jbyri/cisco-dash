export interface TagBarItemModel {
  content: string,
  tagId : number,
  enabled: boolean
}


export interface TagBarModel {
  nextTagInput: string,
  sourceData: TagBarItemModel[],
  dataProvider: TagBarItemModel[]
}
