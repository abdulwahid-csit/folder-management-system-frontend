import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit {

  selectedTab = 'features';
  modalRef: any;
  modalOpen: boolean = false;;
  constructor(private modalService: BsModalService) { }

  columns:any = []

  total_pages = 10;
  payload_size = 10;
  current_page = 1
  has_next= false
  skipped_records = 0
  total_records = 7
  organizationForm!:FormGroup
  
  organizationList:any = []
    dataTable:any = [
      {
        data: {
            columns:[
              {
                name: 'user',
              },
              {
                name: 'Full Name',
              },
              {
                name: 'Role',
              },
              {
                name: 'Status',
              },
              {
                name: 'Last Sign-in',
              },
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
    ];

    applicationColumns: any =[
      {
        name: 'Name',
      },
      {
        name: 'App id',
      },
      {
        name: 'Url',
      },
      {
        name: 'Creation Date',
      },
    ];
  
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





  ngOnInit() {
    this.columns = this.dataTable[0]?.data?.columns;
    this.organizationList = this.dataTable[0].data.payload;

    this.organizationForm = new FormGroup({
      organizationName: new FormControl('', [Validators.required]),
      domainName: new FormControl('', [Validators.required])
    })
  }

  setSelectedTab(tab: string){
    this.selectedTab = tab;
    if(tab === 'applications'){
      this.columns = this.applicationColumns;
    }else{
      this.columns = this.columns = this.dataTable[0]?.data?.columns;
    }
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
    class: 'modal-dialog modal-dialog-centered invite-admin-modal',
    backdrop: 'static',
    keyboard: false,
    
    });
    this.modalOpen = true;
  }


  closeModal(): void {
    this.modalRef?.hide();
    this.modalOpen = false;
  }


  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.organizationForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

}
