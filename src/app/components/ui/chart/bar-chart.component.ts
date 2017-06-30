import {
  Input, Output,
  Component,
  OnInit, OnChanges, SimpleChanges,
  ViewChild, EventEmitter,
  TemplateRef
} from '@angular/core';

import { ChartComponent } from './base-chart.abstract'

@Component({
  selector: 'bar-chart',
  templateUrl : './bar-chart.component.html',
  styleUrls : ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges, ChartComponent {
  @Input()
  chartData : object

  @Input()
  chartUIData : object
  
  constructor(){

  }
  ngOnInit() {

  }

  ngOnChanges(changes : SimpleChanges) {

  }
}
