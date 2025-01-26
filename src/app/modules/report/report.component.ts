import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  lineChartData = [
    {
      name: 'current date',
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

  selectedFolderRange = 7;
  isFoldersInProcess = true;
  // View for the chart (size of the chart)
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  // Other chart configurations
  view: any = [800, 600]; // Set the chart size
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showGridLines = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Dates';
  yAxisLabel = 'Folder Created';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.getFolders();
  }
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

  folders: any;
  lastWeekFolders: any;
  sortedLastweekFolders: any;
  chartData: any;
  lastMonthFolders: any
  sortedLastMonthFolder: any
  getFolders() {
    this.crudService.read('folder/folders', null, null, 30).subscribe(
      (res) => {
        this.folders = res?.folders;
        console.log('Folders: ', this.folders);

        this.lastWeekFolders = this.folders.filter(
          (folder: { createdAt: any }) => {
            const createdAt = moment(folder.createdAt);
            return createdAt.isAfter(moment().subtract(7, 'days'));
          }
        );
      
        this.sortedLastweekFolders = this.lastWeekFolders.sort(
          (
            a: { createdAt: string | number | Date },
            b: { createdAt: string | number | Date }
          ) => {
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          }
        );

        this.lastMonthFolders = this.folders.filter(
          (folder: { createdAt: any }) => {
            const createdAt = moment(folder.createdAt);
            return createdAt.isAfter(moment().subtract(7, 'days'));
          }
        );
      
        this.sortedLastMonthFolder = this.lastWeekFolders.sort(
          (
            a: { createdAt: string | number | Date },
            b: { createdAt: string | number | Date }
          ) => {
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          }
        );


        this.lineChartData = this.countByDate(this.sortedLastweekFolders);
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  getDates(length: number) {
    return Array.from({ length: length }, (_, index) =>
      moment().subtract(index, 'days').format('YYYY-MM-DD')
    );
  }
  countByDate(
    data: any[]
  ): { name: string; series: { name: string; value: number }[] }[] {
    const last7Days = this.getDates(this.selectedFolderRange);

    const groupedByDate: { [key: string]: number } = last7Days.reduce(
      (acc, date) => {
        acc[date] = 0;
        return acc;
      },
      {} as { [key: string]: number }
    );

    data.forEach((item) => {
      const date = moment(item.createdAt).format('YYYY-MM-DD');
      if (groupedByDate[date] !== undefined) {
        groupedByDate[date] += 1;
      }
    });

    const result = Object.keys(groupedByDate).map((date) => ({
      name: date,
      value: groupedByDate[date],
    }));

    const sortedResult = result.sort((a, b) =>
      moment(a.name).isBefore(b.name) ? -1 : 1
    );

    this.isFoldersInProcess = false;
    return [
      {
        name: '',
        series: sortedResult,
      },
    ];
  }

  setRange(){
    // this.isFoldersInProcess = true;
    if(this.selectedFolderRange == 7){

      this.lineChartData = this.countByDate(this.sortedLastweekFolders);
    }else{
      this.lineChartData = this.countByDate(this.sortedLastMonthFolder);
    }
  };
}
