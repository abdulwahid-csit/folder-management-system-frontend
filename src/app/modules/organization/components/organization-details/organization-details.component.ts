import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
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

  columns: any = []

  total_pages = 10;
  payload_size = 10;
  current_page = 1
  has_next = false
  skipped_records = 0
  total_records = 7
  organizationForm!: FormGroup
  inviteMemberForm!: FormGroup;
  editOrganizationForm!: FormGroup;
  searchTerm: string = '';
  selectedOption: any;
  isFocused!: boolean;
  currentStatus = 'active';


  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
];



  organizationList: any = []
  dataTable: any = [
    {
      data: {
        columns: [
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

  applicationColumns: any = [
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

  usersColumns: any = [];
  usersList: any = []
  userDataTable: any = [
    {
      data: {
        columns: [
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
            "id": 3,
            "name": "Wahid",
            "fullName": "Abdul Basit",
            "role": "Admin",
            "status": 'active',
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Wahid",
            "fullName": "Abdul Basit",
            "role": "Admin",
            "status": 'active',
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Wahid",
            "fullName": "Abdul Basit",
            "role": "Admin",
            "status": 'active',
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Wahid",
            "fullName": "Abdul Basit",
            "role": "Admin",
            "status": 'active',
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Wahid",
            "fullName": "Abdul Basit",
            "role": "Admin",
            "status": 'active',
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Wahid",
            "fullName": "Abdul Basit",
            "role": "Admin",
            "status": 'active',
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Wahid",
            "fullName": "Abdul Basit",
            "role": "Admin",
            "status": 'active',
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Wahid",
            "fullName": "Abdul Basit",
            "role": "Admin",
            "status": 'active',
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Wahid",
            "fullName": "Abdul Basit",
            "role": "Admin",
            "status": 'active',
            "creationDate": 'May 24, 2023',
          },
        ]
      }
    }
  ];

  applicationColumn: any = [];
  applicationList: any = [];
  applicationDataTable: any = [
    {
      data: {
        columns: [
          {
            name: 'Name',
          },
          {
            name: 'App Id',
          },
          {
            name: 'Url',
          },
          {
            name: 'Creation Date',
          },

        ],
        payload: [

          {
            "id": 3,
            "name": "Digital solutions",
            "appId": "734832942349234",
            "appUrl": "4iisolutions.com",
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Digital solutions",
            "appId": "734832942349234",
            "appUrl": "4iisolutions.com",
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Digital solutions",
            "appId": "734832942349234",
            "appUrl": "4iisolutions.com",
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Digital solutions",
            "appId": "734832942349234",
            "appUrl": "4iisolutions.com",
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Digital solutions",
            "appId": "734832942349234",
            "appUrl": "4iisolutions.com",
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Digital solutions",
            "appId": "734832942349234",
            "appUrl": "4iisolutions.com",
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Digital solutions",
            "appId": "734832942349234",
            "appUrl": "4iisolutions.com",
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Digital solutions",
            "appId": "734832942349234",
            "appUrl": "4iisolutions.com",
            "creationDate": 'May 24, 2023',
          },
          {
            "id": 3,
            "name": "Digital solutions",
            "appId": "734832942349234",
            "appUrl": "4iisolutions.com",
            "creationDate": 'May 24, 2023',
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



  constructor(private modalService: BsModalService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.columns = this.dataTable[0]?.data?.columns;
    this.organizationList = this.dataTable[0].data.payload;

    this.usersColumns = this.userDataTable[0]?.data?.columns;
    this.usersList = this.userDataTable[0].data.payload;

    this.applicationColumn = this.applicationDataTable[0]?.data?.columns;
    this.applicationList = this.applicationDataTable[0].data.payload;


    this.organizationForm = new FormGroup({
      organizationName: new FormControl('', [Validators.required]),
      domainName: new FormControl('', [Validators.required])
    })

    this.inviteMemberForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')])
    })

    this.editOrganizationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      domain: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    })

  }

  setSelectedTab(tab: string) {
    this.selectedTab = tab;
    if (tab === 'applications') {
      this.columns = this.applicationColumns;
    } else {
      this.columns = this.columns = this.dataTable[0]?.data?.columns;
    }
  }

  openModal(template: TemplateRef<any>, classes: string): void {
    this.modalRef = this.modalService.show(template, {
      class: classes,
      backdrop: 'static',
      keyboard: false,

    });
    this.modalOpen = true;
  }


  closeModal(): void {
    this.modalRef?.hide();
    this.modalOpen = false;
    this.editOrganizationForm.reset();
  }


  isControlHasError(controlName: any, validationType: string, form: any): boolean {
    const control = form.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }


  onInviteAdmin() {
    this.inviteMemberForm.markAllAsTouched();
    if (this.inviteMemberForm.invalid) {
      return;
    }
    console.log("Person invited.");
  }


  onEditOrganization() {

    if (this.organizationForm.invalid) {
      this.editOrganizationForm.markAllAsTouched()
      this.cdr.detectChanges()
      return;
    }
    console.log("Form is submitted.")
    this.cdr.detectChanges()
  }


  onValueChange() {
   
  }


}
