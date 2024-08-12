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
                    "name": "Ideal innovative solutions",
                    "organization": "Ideal innovative solutions",
                    "appId": "734832942349234",
                    "appUrl": "4iisolutions.com",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "status": 'active',
                    "creationDate": '12-8-2024'
                },
                {
                    "id": 1,
                    "name": "Ideal innovative solutions",
                    "organization": "Ideal innovative solutions",
                    "appId": "734832942349234",
                    "appUrl": "4iisolutions.com",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "status": 'active',
                    "creationDate": '12-8-2024'
                },
                {
                    "id": 1,
                    "name": "Ideal innovative solutions",
                    "organization": "Ideal innovative solutions",
                    "appId": "734832942349234",
                    "appUrl": "4iisolutions.com",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "status": 'active',
                    "creationDate": '12-8-2024'
                },
                {
                    "id": 1,
                    "name": "Ideal innovative solutions",
                    "organization": "Ideal innovative solutions",
                    "appId": "734832942349234",
                    "appUrl": "4iisolutions.com",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "status": 'active',
                    "creationDate": '12-8-2024'
                },
                {
                    "id": 1,
                    "name": "Ideal innovative solutions",
                    "organization": "Ideal innovative solutions",
                    "appId": "734832942349234",
                    "appUrl": "4iisolutions.com",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "status": 'active',
                    "creationDate": '12-8-2024'
                },
                {
                    "id": 1,
                    "name": "Ideal innovative solutions",
                    "organization": "Ideal innovative solutions",
                    "appId": "734832942349234",
                    "appUrl": "4iisolutions.com",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "status": 'active',
                    "creationDate": '12-8-2024'
                },
                {
                    "id": 1,
                    "name": "Ideal innovative solutions",
                    "organization": "Ideal innovative solutions",
                    "appId": "734832942349234",
                    "appUrl": "4iisolutions.com",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "status": 'active',
                    "creationDate": '12-8-2024'
                },
                {
                    "id": 1,
                    "name": "Ideal innovative solutions",
                    "organization": "Ideal innovative solutions",
                    "appId": "734832942349234",
                    "appUrl": "4iisolutions.com",
                    "domain_verified": false,
                    "created_at": {},
                    "updated_at": {},
                    "is_archive": false,
                    "status": 'active',
                    "creationDate": '12-8-2024'
                },
              ]
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
