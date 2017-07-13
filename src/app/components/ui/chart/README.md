# Chart Components
Below is a description of all charting components, and some details about their
specific rendering logic.

### Currently selected charting framwork
ChartJS

## Currently Supported Chart Components

### BarChartComponent
Displays a set of labels and data points in Bar Chart format.
Allows different charting configurations (i.e. stacked barchart)

### PieChartComponent
Displays a set of labels and data points in Pie Chart format.
Allows different charting configurations. See charts.js docs.

## In Development
Chart components that are currently in development. Check back soon for support.

### LineChartComponent
Displays a set of lines connecting labels and datapoints in Line Chart format.

## Future

### AreaChartComponent
Display a set of labels and data points in an Area Chart format.

### DonutChartComponent
Displays a set of labels and datapoints in Donut Chart Format.

## Adding New Chart Components
Follow these steps to add a new chart component.


1. Create your chart component within the `app/components/ui/chart` directory, along with all of its styles, tests, and templates.
    1. Insure you add your component to the 'entryComponents' in app.module.ts.
    2. Add your chart options to `chart-options.json`
    3. Add your chart data sets to the customer data file (insure all customers have entries for this new data set.)
    4. Add your chart as a declaration to `app.module.ts`
    5. Add a registry for your chart builder in the dashboard component constructor.
    6. Add the Chart Component as an Entry Component in `app.module.ts`.
    7. See [Chart JS Examples](http://www.chartjs.org/samples/latest/) for more details.
2. While in development, add your chart and a brief description to the "In Development" Heading.
3. Once complete, move your heading and description under the "Currently Supported Chart Components" heading, and fill out a more detailed description of the component.
4. If a new chart is to be created and not yet in progress, add a heading and a single sentence description to the "Future" heading.


Anatomy of a Chart Component:


```
import {
  Component,
  ComponentFactory
} from '@angular/core';


import { CardContentModel, ChartContentModel } from '../card/card-content.model'
import { CardContentObject } from '../card/card-content.component';
import { ChartDataset, BaseChartComponent, BaseChartContentBuilder } from './base-chart.abstract'
import { CiscoDataset } from '../../../model/cisco.model'


export class CoolChartContentBuilder extends BaseChartContentBuilder {

  buildCardContent(): CardContentObject {
    let componentFactory: ComponentFactory<CardContentObject> = this.componentFactoryResolver.resolveComponentFactory(CoolChartComp);
    this.cardContent = this.viewContainerRef.createComponent(componentFactory, 0).instance;
    return this.cardContent;
  }
}

@Component({
  selector: 'cool-chart',
  templateUrl: './cool-chart.component.html',
  styleUrls: ['./cool-chart.component.css']
})
export class CoolChartComponent extends BaseChartComponent implements CardContentObject {
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
    let i = 0;
    let count = this.chartData.datasets.length;

    let datasets : Array<object> = [];
    for (i; i < count; i++) {
      datasets.push(this.buildDataset(this.chartData.datasets[i], valueKey));
    }

    return datasets;
  }


  public ngAfterViewInit() : void {
    let ctx = this.getCanvas().getContext('2d');
    let myChart = new this.Chart(ctx, {
      type: 'cool', // fictitious chart type, see docs!!
      data: {
        labels: this.buildLabels(this.labelKeys[0]),
        datasets: this.buildDatasets(this.valueKeys[0])
      },
      options: this.chartUIData.chartOptions.data
    });

    this.onChartResize(null);
  }
}
```
