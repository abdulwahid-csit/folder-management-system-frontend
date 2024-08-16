import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateOrganizationComponent } from '../create-organization/create-organization.component';
import { OrganizationDetailsComponent } from '../organization-details/organization-details.component';
import { CrudService } from 'src/app/shared/services/crud.service';
import { AddOrganization, Organization, OrganizationState } from '../../state/organization.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent {
  @Select(OrganizationState.getOrganizations) users$!: Observable<Organization[]>;

  constructor(
    private modalService: BsModalService,
    private crudService: CrudService,
    private store: Store
  ) { }

  columns: any = []

  // total_pages = 0;
  // payload_size = 0;
  // current_page = 0;
  // has_next = false
  // skipped_records = 0;
  // total_records = 0;
  modalRef?: BsModalRef;
  searchTerm: string = '';

  organizationList: any = []
  // dataTable: any = [
  //   {
  //     data: {
  //       columns: [
  //         {
  //           name: 'Name',
  //         },
  //         {
  //           name: 'domain',
  //         },
  //         {
  //           name: 'Total No. Of Applications',
  //         },
  //         {
  //           name: 'users',
  //         },
  //         {
  //           name: 'status',
  //         },
  //         {
  //           name: 'Creation Date',
  //         }
  //       ],
  //       payload: [
  //         {
  //           "id": 1,
  //           "name": "Digital solutions",
  //           "domain": "4iisolutions.com",
  //           "domain_verified": false,
  //           "is_archive": false,
  //           "total_no_of_application": 15,
  //           "users": 199,
  //           "status": 'active',
  //           "creationDate": '12-8-2024'
  //         },
  //         {
  //           "id": 3,
  //           "name": "organizations 1",
  //           "domain": "https://adminv2-dev.techbar.com/auth/login",
  //           "domain_verified": false,
  //           "created_at": {},
  //           "updated_at": {},
  //           "is_archive": false,
  //           "total_no_of_application": 10,
  //           "users": 588,
  //           "status": 'inactive',
  //           "creationDate": '01-8-2024'
  //         },
  //         {
  //           "id": 7,
  //           "name": "organizations 67",
  //           "domain": "http://kham.ai",
  //           "domain_verified": false,
  //           "created_at": {},
  //           "updated_at": {},
  //           "is_archive": false,
  //           "total_no_of_application": 1,
  //           "users": 900,
  //           "status": 'active',
  //           "creationDate": '15-8-2024'
  //         },
  //         {
  //           "id": 9,
  //           "name": "created",
  //           "domain": "http://kham.ai",
  //           "domain_verified": false,
  //           "created_at": {},
  //           "updated_at": {},
  //           "is_archive": false,
  //           "total_no_of_application": 14,
  //           "users": 189,
  //           "status": 'inactive',
  //           "creationDate": '30-8-2024'
  //         },
  //         {
  //           "id": 8,
  //           "name": "created updated 8",
  //           "domain": "http://kham.bi",
  //           "domain_verified": false,
  //           "created_at": {},
  //           "updated_at": {},
  //           "is_archive": false,
  //           "total_no_of_application": 7,
  //           "users": 130,
  //           "status": 'active',
  //           "creationDate": '12-10-2023'
  //         },
  //         {
  //           "id": 9,
  //           "name": "organization 01",
  //           "domain": "http://web.ai",
  //           "domain_verified": false,
  //           "created_at": {},
  //           "updated_at": {},
  //           "is_archive": false,
  //           "total_no_of_application": 10,
  //           "users": 150,
  //           "status": 'inactive',
  //           "creationDate": '12-8-2024'
  //         },
  //         {
  //           "id": 10,
  //           "name": "backend development",
  //           "domain": "http://backend.dev",
  //           "domain_verified": false,
  //           "created_at": {},
  //           "updated_at": {},
  //           "is_archive": true,
  //           "total_no_of_application": 1,
  //           "users": 114,
  //           "status": 'active',
  //           "creationDate": '12-12-2023'
  //         },
  //         {
  //           "id": 11,
  //           "name": "backend development",
  //           "domain": "http://backend.dev",
  //           "domain_verified": false,
  //           "created_at": {},
  //           "updated_at": {},
  //           "is_archive": true,
  //           "total_no_of_application": 1,
  //           "users": 114,
  //           "status": 'active',
  //           "creationDate": '12-12-2023'
  //         },
  //         {
  //           "id": 12,
  //           "name": "backend development",
  //           "domain": "http://backend.dev",
  //           "domain_verified": false,
  //           "created_at": {},
  //           "updated_at": {},
  //           "is_archive": true,
  //           "total_no_of_application": 1,
  //           "users": 114,
  //           "status": 'active',
  //           "creationDate": '12-12-2023'
  //         },
  //         {
  //           "id": 13,
  //           "name": "backend development",
  //           "domain": "http://backend.dev",
  //           "domain_verified": false,
  //           "created_at": {},
  //           "updated_at": {},
  //           "is_archive": true,
  //           "total_no_of_application": 1,
  //           "users": 114,
  //           "status": 'active',
  //           "creationDate": '12-12-2023'
  //         },
  //         {
  //           "id": 14,
  //           "name": "backend development",
  //           "domain": "http://backend.dev",
  //           "domain_verified": false,
  //           "created_at": {},
  //           "updated_at": {},
  //           "is_archive": true,
  //           "total_no_of_application": 1,
  //           "users": 114,
  //           "status": 'active',
  //           "creationDate": '12-12-2023'
  //         },
  //         {
  //           "id": 15,
  //           "name": "backend development",
  //           "domain": "http://backend.dev",
  //           "domain_verified": false,
  //           "created_at": {},
  //           "updated_at": {},
  //           "is_archive": true,
  //           "total_no_of_application": 1,
  //           "users": 114,
  //           "status": 'active',
  //           "creationDate": '12-12-2023'
  //         },
  //         {
  //           "id": 16,
  //           "name": "backend development",
  //           "domain": "http://backend.dev",
  //           "domain_verified": false,
  //           "created_at": {},
  //           "updated_at": {},
  //           "is_archive": true,
  //           "total_no_of_application": 1,
  //           "users": 114,
  //           "status": 'active',
  //           "creationDate": '12-12-2023'
  //         },
  //       ],
  //       paginate_options: {
  //         "total_pages": 1,
  //         "payload_size": 7,
  //         "has_next": false,
  //         "current_page": 1,
  //         "skipped_records": 0,
  //         "total_records": 7
  //       }
  //     }
  //   }
  // ]

  // assign the data from api like total_pages, payload_size
  tableConfig = {
    paginationParams: {
      "total_pages": 0,
      "payload_size": 0,
      "has_next": false,
      "current_page": 0,
      "skipped_records": 0,
      "total_records": 0
    }
  };

  ngOnInit(): void {
    // this.columns = this.dataTable[0]?.data?.columns;
    // this.organizationList = this.dataTable[0].data.payload;
    this.getOrganization();
  }

  getOrganization(){
    this.crudService.read('api/v1/organization').subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        this.store.dispatch(new AddOrganization(response));
        if (response.data.payload.length > 0) {
          const column = Object.keys(response.data.payload[0]);
          this.columns = column.filter((column: string) => column !== 'id' && column !== 'logo');
          this.organizationList = response.data.payload;

          this.tableConfig = {
            paginationParams: {
              "total_pages": response.data.paginate_options.total_pages,
              "payload_size": response.data.paginate_options.payload_size,
              "has_next": response.data.paginate_options.has_next,
              "current_page": response.data.paginate_options.current_page,
              "skipped_records": response.data.paginate_options.skipped_records,
              "total_records": response.data.paginate_options.total_records
            }
          };
        }
      } 

    }, error => {
      console.error('HTTP error:', error);
    });
  }

  createOganization() {
    const initialState = { itemList: '', title: 'Create' };
    this.modalRef = this.modalService.show(CreateOrganizationComponent, {
      class: 'common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState,
    });

    this.modalRef.content.successCall.subscribe(() => {
      this.getOrganization();
    });
  }
}
