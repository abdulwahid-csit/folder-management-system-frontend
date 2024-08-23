import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  userName: string = '';

  columns: any = []
  overViewList: any = []
  dataTable: any = []
  tableConfig = {
    paginationParams: {
      "total_pages": 1,
      "payload_size": 0,
      "has_next": false,
      "current_page": 1,
      "skipped_records": 0,
      "total_records": 0
    }
  };

  constructor(
    private localStoreService: LocalStoreService,
    private crudService: CrudService
  ) {}

  ngOnInit(): void {

    this.userName = this.localStoreService.getUserName();

    this.getOverview();
    this.getUserLogs();
  }

  getOverview(){
    this.crudService.read('dashboard/overview').subscribe((response: any) => {
      this.overViewList = response.data;
    }, error => {
      console.error('HTTP error:', error);
    });
  }
  
  getUserLogs(){
    this.crudService.read('dashboard/user-logs').subscribe((response: any) => {
      if (response.data.length > 0) {
        const column = Object.keys(response.data[0]);
        this.columns = column.filter((column: string) => column !== 'last_name');
        this.dataTable = response.data;
      }
    }, error => {
      console.error('HTTP error:', error);
    });
  }
}
