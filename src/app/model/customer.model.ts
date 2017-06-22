// customer
export interface Customer {
  name : string,
  displayName : string,
  dataUrl : string
}

// the customer model
export interface CustomerModel {
  data : CustomerData
}

// customer feedback model
export interface CustomerFeedback {
  title : string,
  text : string,
  performance : number
}

// customer datapoint
export interface CustomerDatapoint {
  title: string,
  tagIds : number[],
  contentType: string,
  content : any
}

// customer data model
export interface CustomerData {
  feedbacks : CustomerFeedback[],
  datapoints : CustomerDatapoint[]
}
