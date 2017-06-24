export interface TagBarItemModel {
  content : string
}


export interface TagBarModel {
  nextTagInput : string,
  sourceData : TagBarItemModel[],
  dataProvider : TagBarItemModel[]
}
