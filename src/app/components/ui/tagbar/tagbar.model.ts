export interface TagBarItemModel {
  content: string,
  enabled: boolean
}


export interface TagBarModel {
  nextTagInput: string,
  sourceData: TagBarItemModel[],
  dataProvider: TagBarItemModel[]
}
