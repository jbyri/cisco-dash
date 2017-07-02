export interface ChartComponent {
  /**
   * Data passed directly into the chart
   */
  chartData : object;


  /**
   * Data that is used to configure the chart, and contais the chartData and
   * chart Data's labels.
   */
  chartUIData : object;
}
