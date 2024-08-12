import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  columns: any = []

  total_pages = 10;
  payload_size = 10;
  current_page = 1
  has_next = false
  skipped_records = 0
  total_records = 7
  modalRef?: BsModalRef;
  searchTerm: string = '';

  organizationList: any = []
  dataTable: any = [
    {
      data: {
        columns: [
          {
            name: 'Person',
          },
          {
            name: 'Date',
          },
          {
            name: 'Time',
          },
          {
            name: 'Activity',
          },
        ],
        payload: [
          {
            "id": 1,
            "name": "Thresa Web",
            "activityDate": 'Feb 15, 2020',
            "time": '30 mins ago',
            "Activity": 'Log in',
            
          },
          {
            "id": 2,
            "name": "Jhony smith",
            "activityDate": 'Feb 12, 2023',
            "time": '45 mins ago',
            "Activity": 'Log out'
          },
          {
            "id": 2,
            "name": "Cameron Williamson",
            "activityDate": 'Feb 12, 2023',
            "time": '45 mins ago',
            "Activity": 'Log out'
          },
          {
            "id": 2,
            "name": "Brooklyn Simmons",
            "activityDate": 'Feb 12, 2023',
            "time": '3 hours ago',
            "Activity": 'Log out'
          },
          {
            "id": 1,
            "name": "Thresa Web",
            "activityDate": 'Feb 15, 2020',
            "time": '30 mins ago',
            "Activity": 'Log in'
          },
          {
            "id": 2,
            "name": "Jhony smith",
            "activityDate": 'Feb 12, 2023',
            "time": '45 mins ago',
            "Activity": 'Log out'
          },
          {
            "id": 2,
            "name": "Cameron Williamson",
            "activityDate": 'Feb 12, 2023',
            "time": '45 mins ago',
            "Activity": 'Log out'
          },
          {
            "id": 2,
            "name": "Brooklyn Simmons",
            "activityDate": 'Feb 12, 2023',
            "time": '3 hours ago',
            "Activity": 'Log out'
          },
          {
            "id": 1,
            "name": "Thresa Web",
            "activityDate": 'Feb 15, 2020',
            "time": '30 mins ago',
            "Activity": 'Log in'
          },
          {
            "id": 2,
            "name": "Jhony smith",
            "activityDate": 'Feb 12, 2023',
            "time": '45 mins ago',
            "Activity": 'Log out'
          },
          {
            "id": 2,
            "name": "Cameron Williamson",
            "activityDate": 'Feb 12, 2023',
            "time": '45 mins ago',
            "Activity": 'Log out'
          },
          {
            "id": 2,
            "name": "Brooklyn Simmons",
            "activityDate": 'Feb 12, 2023',
            "time": '3 hours ago',
            "Activity": 'Log out'
          },
    
        ],
        paginate_options: {
          "total_pages": 1,
          "payload_size": 7,
          "has_next": false,
          "current_page": 1,
          "skipped_records": 0,
          "total_records": 7
        }
      }
    }
  ]

  // assign the data from api like total_pages, payload_size
  tableConfig = {
    paginationParams: {
      "total_pages": this.total_pages,
      "payload_size": this.payload_size,
      "has_next": this.has_next,
      "current_page": this.current_page,
      "skipped_records": this.skipped_records,
      "total_records": this.total_records
    }
  };

  ngOnInit(): void {
    this.columns = this.dataTable[0]?.data?.columns;
    this.organizationList = this.dataTable[0].data.payload;
    console.log('list data', this.organizationList)
  }

}
