/**
 * Used to provide an inherited convenience for Chart Components of any type.
 * this class contains on the basic needs for all charts. Specific charts that extend
 * this class will provide their own custom logic to render as needed.
 *
 * This interface is not tied to some specific charting framework. The idea
 * is to support any chart framework. The chart components are to provide
 * the logic necessary for the chosen charting framework. Here we provide a simple
 * division between view data and model data so that Chart components contain the data
 * required to render.
 */
export interface ChartComponent {
  /**
   * Data passed directly into the chart
   */
  chartData : object;


  /**
   * Data that is used to configure the chart, and contains the chartData and
   * chart Data's labels.
   */
  chartUIData : object;
}
