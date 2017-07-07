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
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent extends BaseChartComponent implements CardContentObject {
  constructor() {
    super();
    console.debug('BarChartComponent::constructor()');
  }

  public onPointerOver(event: any) {
    event.preventDefault();
  }

  public onMouseMove(event: any) {
    event.preventDefault();
  }

  public configure(cardContentModel: CardContentModel): CardContentObject {
    let chartContentModel: ChartContentModel = <ChartContentModel>cardContentModel;

    console.debug('configure()', cardContentModel);

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

  public buildDatasets(valueKey: string): Array<any> {
    console.log('buildDatasets()', valueKey, this.chartUIData, this.chartData);
    let i = 0;
    let count = this.chartData.datasets.length;

    let datasets : Array<object> = [];
    for (i; i < count; i++) {
      datasets.push(this.buildDataset(this.chartData.datasets[i], valueKey));
    }

    return datasets;
  }
  // OVERRIDE
  public ngAfterViewInit() {
    console.debug('ngAfterViewInit', this.chartUIData);
    let ctx = this.getCanvas().getContext('2d');
    let myChart = new this.Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.buildLabels(this.labelKeys[0]),
        datasets: this.buildDatasets(this.valueKeys[0])
      },
      options: this.chartUIData.chartOptions.data
    });

    console.log('Chart: ', this.Chart, myChart);
    this.onChartResize(null);
  }
}
