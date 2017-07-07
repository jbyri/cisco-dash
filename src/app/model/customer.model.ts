// customer
export interface Customer {
  name: string,
  displayName: string,
  dataUrl: string
}

// the customer model
export interface CustomerModel {
  data: CustomerData
}

// customer feedback model
export interface CustomerFeedback {
  title: string,
  text: string,
  performance: number
}

// customer datapoint
export interface CustomerDatapoint {
  title: string,
  tagIds: number[],
  content: CustomerDatapointContent
}

// content of the data point
// this can have a type (i.e. "chart")
// and the data can be of any format. At this
// point it would be up to ui to render it based
// on these fields and the data content.
export interface CustomerDatapointContent {
  type: string,
  data: any
}

// customer data model
export interface CustomerData {
  feedbacks: CustomerFeedback[],
  datapoints: CustomerDatapoint[]
}
