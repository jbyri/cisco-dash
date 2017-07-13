import { ChartOptions } from '../../../model/chart-options.model'

export interface CardContentModel {
  cardContentMetadata : CardMetadataModel,
  cardContentData: any
}

export interface MetricInfo {
  title: string,
  text: string
}
export interface MetricEffect {
  effect :number,
  effectValue : any
}

// populates the widget data that is not actually part of the Chart Data.
// This includes the effect (positive, neutral, negative) as well as any
// additional rich information about the metric on display.
export interface CardMetadataModel {
  metricInfo : MetricInfo,
  metricEffect : MetricEffect
}

export interface ChartContentModel extends CardContentModel {
  chartType: string,
  chartOptions : ChartOptions
}
