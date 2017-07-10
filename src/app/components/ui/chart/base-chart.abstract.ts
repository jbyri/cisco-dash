import {
  Input,
  ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver
} from '@angular/core'
import { LifecycleHooks } from '../../abstract/lifecycle-hooks.abstract'
import { CardContentModel } from '../card/card-content.model';
import { CardContentBuilder, CardContentObject } from '../card/card-content.component';
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
  chartData: object;

  /**
   * Data that is used to configure the chart, and contains the chartData and
   * chart Data's labels.
   */
  chartUIData: ChartUIData;

  /**
   * the canvas element in the view
   */
  canvasElement: ElementRef;
}

/**
 * Chart UI Data items. (Used for HTML appearance)
 */
export interface ChartUIData {
  /**
   * Dimensions of the chart canvas
   */
  displayWidth: number;

  /**
   * Dimensions of the chart canvs
   */
  displayHeight: number;

  /**
   * Chart Options
   */
  chartOptions: any;
}

/**
 * Chart dataset interface
 */
export interface ChartDataset {
  backgroundColor : Array<string>;
  data: Array<any>;
  label : string;
  type : string;
}

/**
 * Base Chart Content Builder used as an inheritance convenience
 */
export class BaseChartContentBuilder implements CardContentBuilder {
  // public componentFactoryResolver : ComponentFactoryResolver;

  protected viewContainerRef: ViewContainerRef;
  protected cardContent: CardContentObject;

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    
  }

  /**
   * @see CardContentObject
   */
  public configure(cardContentModel: CardContentModel): CardContentObject {
    return this;
  }

  setViewContainerRef(viewContainerRef: ViewContainerRef): CardContentBuilder {
    // console.debug("BaseChartContentBuilder::setViewContainerRef()", viewContainerRef);
    this.viewContainerRef = viewContainerRef;
    return this;
  }

  getViewContainerRef(): ViewContainerRef {
    // console.debug("BaseChartContentBuilder::getViewContainerRef()", this.viewContainerRef);
    return this.viewContainerRef;
  }
  /**
   * Builds the Content Object in this case a BarChartComponent
   */
  buildCardContent(): CardContentObject {
    return null;
  }
}

/**
 * Base Chart Component Implementation
 */
export class BaseChartComponent extends LifecycleHooks implements ChartComponent {

  public Chart: any = window['Chart'];

  @Input()
  public chartData: any;

  // one label key per dataset
  @Input()
  public labelKeys : Array<string>

  // one value key per dataset
  @Input()
  public valueKeys : Array<string>

  @Input()
  public chartUIData: ChartUIData;

  @ViewChild('chartContainer')
  public containerElement: ElementRef;

  // the canvas Angular element ref.
  @ViewChild('chartContent')
  public canvasElement: ElementRef;

  // the HTMLCanvasElement DOM Element represented by
  // the Canvas Element
  private canvas: HTMLCanvasElement;

  constructor() {
    super();
    this.addInput('chartData');
    this.addInput('chartUIData');
    this.addInput('canvasElement');
  }

  protected refreshLayout() {
    let canvas: HTMLCanvasElement = this.getCanvas();
    this.chartUIData.displayWidth = this.containerElement.nativeElement.clientWidth;
    this.chartUIData.displayHeight = this.containerElement.nativeElement.clientHeight;

    canvas.width = this.chartUIData.displayWidth;
    canvas.height = this.chartUIData.displayHeight;
  }

  protected onChartResize(event: any) {
    this.refreshLayout();
  }


  public getCanvas(): HTMLCanvasElement {
    if (this.canvasElement == null) {
      return null;
    }

    if (this.canvas == null) {
      this.canvas = <HTMLCanvasElement>this.canvasElement.nativeElement;
    }

    return this.canvas;
  }

  onAllInputsReady(): void {
    this.refreshLayout();
  }
}
