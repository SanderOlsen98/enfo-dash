import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Boost from 'highcharts/modules/boost';

// apply the Boost module to the Highcharts librar
Boost(Highcharts);

@Component({
  selector: 'app-widget-line',
  templateUrl: './line.component.html',
})
export class LineComponent implements OnInit {
  // define a chartOptions property of type any
  chartOptions: any;

  constructor() {}

  // create a Highcharts property equal to the imported Highcharts library
  Highcharts = Highcharts;

  // define a chart property of type
  chart: any;

  // define the zoomIn method
  zoomIn() {
    this.chart.xAxis[0].setExtremes(
      this.chart.xAxis[0].min + 1000,
      this.chart.xAxis[0].max - 1000
    );
    this.chart.yAxis[0].setExtremes(
      this.chart.yAxis[0].min + 2,
      this.chart.yAxis[0].max - 2
    );
  }

  // define the zoomOut method
  zoomOut() {
    this.chart.xAxis[0].setExtremes(
      this.chart.xAxis[0].min - 1000,
      this.chart.xAxis[0].max + 1000
    );
    this.chart.yAxis[0].setExtremes(
      this.chart.yAxis[0].min - 1,
      this.chart.yAxis[0].max + 1
    );
  }

  ngOnInit(): void {
    const n: number = 3500;

    // get data using the getData method with n as an argument
    const data = this.getData(n);

    // Setting the chart properties
    this.chartOptions = {
      chart: {
        zoomType: 'xy',
        panning: 'xy',
        panKey: 'shift',

        scrollablePlotArea: {
          minWidth: 20004,
          scrollPositionX: 0.5,
          width: 20,
        },
      },

      title: {
        text: 'Highcharts drawing ' + n + ' points',
      },
      subtitle: {
        text: 'Using the Boost module',
      },
      accessibility: {
        screenReaderSection: {
          beforeChartFormat:
            '<{headingTagName}>{chartTitle}</{headingTagName}><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div>',
        },
      },
      tooltip: {
        valueDecimals: 1,
      },
      xAxis: {
        type: 'datetime',
        scrollbar: {
          minWidth: 5,
          width: 3500,
        },
      },
      yAxis: {
        scrollbar: {
          minWidth: 5,
          width: 3500,
        },
      },
      series: [
        {
          data: data,
          lineWidth: 2,
          name: 'Hourly data points',
        },
      ],
    };
  }

  saveInstance(chartInstance: Highcharts.Chart) {
    this.chart = chartInstance;
  }

  // This function create the data for the chart, fetched the sample data from highcharts
  getData(n: number) {
    let arr = [],
      i,
      x,
      a = Math.random(),
      b = Math.random(),
      c = Math.random(),
      spike;
    for (i = 0; i < n; i = i + 1) {
      x = i + 154006012876;
      if (i % 100 === 0) {
        spike = 10;
      } else {
        spike = 0;
      }
      arr.push([
        x,
        2 * Math.sin(i / 10000000000000) + a + b + c + spike + Math.random(),
      ]);
    }
    return arr;
  }
}
