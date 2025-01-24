import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  lineChartData = [
    {
      name: '2018', // Series name (usually year or a time period)
      series: [
        { name: '01/01/2025', value: 20 },
        { name: '02/01/2025', value: 16 },
        { name: '03/01/2025', value: 18 },
        { name: '04/01/2025', value: 10 },
        { name: '05/01/2025', value: 4 },
        { name: '06/01/2025', value: 9 },
        { name: '07/01/2025', value: 10 },
      ],
    },
    {
      name: '2019',
      series: [
        { name: '01/01/2025', value: 20 },
        { name: '02/01/2025', value: 16 },
        { name: '03/01/2025', value: 18 },
        { name: '04/01/2025', value: 10 },
        { name: '05/01/2025', value: 4 },
        { name: '06/01/2025', value: 9 },
        { name: '07/01/2025', value: 10 },
      ],
    },
    {
      name: '2020',
      series: [
        { name: '01/01/2025', value: 20 },
        { name: '02/01/2025', value: 16 },
        { name: '03/01/2025', value: 18 },
        { name: '04/01/2025', value: 10 },
        { name: '05/01/2025', value: 4 },
        { name: '06/01/2025', value: 9 },
        { name: '07/01/2025', value: 10 },
      ],
    },
  ];

  // View for the chart (size of the chart)
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  // Other chart configurations
  view: any = [1000, 600]; // Set the chart size
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showGridLines = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Dates';
  yAxisLabel = 'Folder Created';

  constructor() {}

  ngOnInit(): void {}
  // Prepare the data for the line chart

  // Group records by date
  groupByDate(records: any) {
    return records.reduce((acc: any, record: any) => {
      const date = new Date(record.createdAt).toLocaleDateString(); // Format date
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(record);
      return acc;
    }, {});
  }
}
