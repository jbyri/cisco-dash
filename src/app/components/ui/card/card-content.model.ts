import { ChartOptions } from '../../../model/chart-options.model'

export interface CardContentModel {
  cardContentData: any
}

export interface ChartContentModel extends CardContentModel {
  chartType: string,
  chartOptions : ChartOptions
}
