import {
  Component,
  ComponentFactory
} from '@angular/core';


import { CardContentModel, ChartContentModel } from '../card/card-content.model'
import { CardContentObject } from '../card/card-content.component';
import { ChartDataset, BaseChartComponent, BaseChartContentBuilder } from './base-chart.abstract'
import { CiscoDataset } from '../../../model/cisco.model'

/**
 * This represents a CardContentBuilder implementation that creates BarChart type
 * Card Content. This allows us to dynamically allocate a card to have a bar chart
 * using the `<bar-chart></bar-chart>` selector without hard-coding it into the content.
 *
 * @see BaseChartContentBuilder
 */
export class BarChartContentBuilder extends BaseChartContentBuilder {

  /**
   * Builds the Content Object in this case a BarChartComponent
   */
  buildCardContent(): CardContentObject {
    // dynamically create and instert our content component using the supplied
    // component factory.
    let componentFactory: ComponentFactory<CardContentObject> = this.componentFactoryResolver.resolveComponentFactory(BarChartComponent);
    this.cardContent = this.viewContainerRef.createComponent(componentFactory, 0).instance;
    return this.cardContent;
  }
}

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent extends BaseChartComponent implements CardContentObject {

  /**
   * Configure the Chart component given a CardContentModel
   *
   * this will contain the values / labels and UIData all mixed together
   * so we can fully build a beautiful chart.
   */
  public configure(cardContentModel: CardContentModel): CardContentObject {
    let chartContentModel: ChartContentModel = <ChartContentModel>cardContentModel;

    this.labelKeys = chartContentModel.cardContentData.labelKeys;
    this.valueKeys = chartContentModel.cardContentData.valueKeys;
    this.chartData = chartContentModel.cardContentData.chartData;
    this.chartUIData = {
      displayWidth: 0,
      displayHeight: 0,
      chartOptions: chartContentModel.chartOptions
    }

    return this;
  }

  /**
   * Build the labels for our datasets. we can do this
   * by simply grabbing the FIRST data set and reading its unique
   * labels. We'll then apply that to all dataset.
   */
  public buildLabels(labelKey : string): Array<any> {
    let dataEntries : Array<any> = this.chartData.datasets[0].values;
    let labels : Array<string> = [];
    if (dataEntries != null) {
      dataEntries.map(entry => {
         labels.push(entry[labelKey]);
      })
    }
    return labels;
  }


  /**
   * build the current data set.
   */
  public buildDataset(inputDataset : CiscoDataset, valueKey : string): object {
    let dataset: ChartDataset = {
      data: [],
      backgroundColor: [],
      label : inputDataset.label == null ? undefined : inputDataset.label,
      type : inputDataset.type == null ? undefined : inputDataset.type
    };

    inputDataset.values.map(value => {
      dataset.data.push(value[valueKey]);
      dataset.backgroundColor.push(inputDataset.backgroundColor);

    });

    return dataset;
  }

  /**
   * Build all datasets using the specified value key form the CardContentModel
   */
  public buildDatasets(valueKey: string): Array<any> {
    let i = 0;
    let count = this.chartData.datasets.length;

    let datasets : Array<object> = [];
    for (i; i < count; i++) {
      datasets.push(this.buildDataset(this.chartData.datasets[i], valueKey));
    }

    return datasets;
  }
  // OVERRIDE

  /**
   * public ngAfterViewInit - Build the dataset
   */
  public ngAfterViewInit() : void {
    let ctx = this.getCanvas().getContext('2d');
    let myChart = new this.Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.buildLabels(this.labelKeys[0]),
        datasets: this.buildDatasets(this.valueKeys[0])
      },
      options: this.chartUIData.chartOptions.data
    });

    this.onChartResize(null);
  }

}
