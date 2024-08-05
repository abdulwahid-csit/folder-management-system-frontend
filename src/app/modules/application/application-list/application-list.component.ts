import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApplicationDetailsComponent } from '../application-details/application-details.component';
import { CreateApplicationComponent } from '../create-application/create-application.component';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent {

  columns:any = []

  total_pages = 10;
  payload_size = 10;
  current_page = 1
  has_next= false
  skipped_records = 0
  total_records = 7
  modalRef?: BsModalRef;
  searchTerm: string = '';
  
  organizationList:any = []
    dataTable:any = [
      {
        data: {
            columns:[
              {
                name: 'Name',
              },
              {
                name: 'Organization',
              },
              {
                name: 'App ID',
              },
              {
                name: 'url',
              },
              {
                name: 'status',
              },
              {
                name: 'Creation Date',
              }
            ],
            payload: [
                {
                    "id": 1,
                    "name": "organizations 1",
                    "domain": null,
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "total_no_of_application": 15,
                    "users": 199,
                    "status": 'active',
                    "creationDate": '12-8-2024'
                },
                {
                    "id": 3,
                    "name": "organizations 1",
                    "domain": "https://adminv2-dev.techbar.com/auth/login",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "total_no_of_application": 10,
                    "users": 588,
                    "status": 'inactive',
                    "creationDate": '01-8-2024'
                },
                {
                    "id": 7,
                    "name": "organizations 67",
                    "domain": "http://kham.ai",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "total_no_of_application": 1,
                    "users": 900,
                    "status": 'active',
                    "creationDate": '15-8-2024'
                },
                {
                    "id": 9,
                    "name": "created",
                    "domain": "http://kham.ai",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "total_no_of_application": 14,
                    "users": 189,
                    "status": 'inactive',
                    "creationDate": '30-8-2024'
                },
                {
                    "id": 8,
                    "name": "created updated 8",
                    "domain": "http://kham.bi",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "total_no_of_application": 7,
                    "users": 130,
                    "status": 'active',
                    "creationDate": '12-10-2023'
                },
                {
                    "id": 11,
                    "name": "organization 01",
                    "domain": "http://web.ai",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "total_no_of_application": 10,
                    "users": 150,
                    "status": 'inactive',
                    "creationDate": '12-8-2024'
                },
                {
                    "id": 10,
                    "name": "backend development",
                    "domain": "http://backend.dev",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": true,
                    "total_no_of_application": 1,
                    "users": 114,
                    "status": 'active',
                    "creationDate": '12-12-2023'
                }
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


    constructor(private modalService: BsModalService){}
  
    ngOnInit(): void {
      this.columns = this.dataTable[0]?.data?.columns;
      this.organizationList = this.dataTable[0].data.payload
    }

    createApplication() {
      // const initialState = { data, type: 'asset' };
      this.modalRef = this.modalService.show(CreateApplicationComponent, {
        class: 'modal-dialog modal-dialog-centered modal-lg create_organization',
        backdrop: 'static',
        keyboard: true,
        // initialState,
      });
    }
}
