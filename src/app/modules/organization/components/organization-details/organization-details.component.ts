import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { CreateOrganizationComponent } from '../create-organization/create-organization.component';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit {

  selectedTab = 'features';
  modalRef: any;
  modalOpen: boolean = false;
  isLoading: boolean = false;
  organizationId: number = 0;
  organizationStatus: string = '';

  searchTerm: string = '';
  selectedOption: any;
  isFocused!: boolean;

  inviteMemberForm!: FormGroup;

  organizationData: any;
  columns: any = []
  dataTableList: any = []

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



  constructor(
    private modalService: BsModalService, 
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    public localStoreService: LocalStoreService,
  ) { }

  ngOnInit() {
    this.initialize();
    this.getOrganization();
  }
  
  initialize(){
    this.inviteMemberForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  
  }

  getOrganization(){
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.organizationId = +idParam;
      }

      this.crudService.read('organization/'+ this.organizationId).subscribe((response: any) => {
        if (response.status_code === 200 || response.status_code === 201) {
          if (response.data && typeof response.data === 'object') {
            const column = Object.keys(response.data);
            this.columns = column.filter((column: string) => column !== 'id' && column !== 'logo');
            this.organizationData = response.data;
            this.organizationStatus = response.data.status;
          }
        } 
      }, error => {
        console.error('HTTP error:', error);
      });
    });
  }

  getOrganizationUsers(){
    this.crudService.read('users?organization='+ this.organizationId).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        if (response.data && typeof response.data === 'object') {
          const column = Object.keys(response.data.payload[0]);
          this.columns = column.filter((column: string) => column !== 'id' && column !== 'email_verified' && column !== 'updated_at' && column !== 'last_name'
                && column !== 'organization' && column !== 'timezone' && column !== 'profile_picture' && column !== 'roles' && column !== 'permissions');
          this.dataTableList = response.data.payload;
          
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

  getOrganizationApplication(){
    this.crudService.read('applications?organization='+ this.organizationId).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        if (response.data && typeof response.data === 'object') {
          const column = Object.keys(response.data.payload[0]);
          this.columns = column.filter((column: string) => column !== 'id' && column !== 'created_by' && column !== 'updated_by' && column !== 'updated_at' && column !== 'organization');
          this.dataTableList = response.data.payload;
          
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

  setSelectedTab(tab: string) {
    this.selectedTab = tab;
    this.columns = [];
    this.dataTableList =  [];
    this.searchTerm = '';

    if (tab === 'application') {
      this.getOrganizationApplication();
    } else if (tab === 'user') {
      this.getOrganizationUsers();
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

  organizationModal(): void {
    const initialState = {itemList: this.organizationData, title: 'Edit', organizationId: this.organizationId};
    this.modalRef = this.modalService.show(CreateOrganizationComponent, {
      class: 'modal-dialog-centered common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState,
    });

    this.modalRef.content.successCall.subscribe(() => {
      this.getOrganization();
    });
  }

  organizationDeleteModal(): void {
    const initialState = {isLoading: false, description: 'Please confirm you really want to delete the organization. After clicking yes, the organization will be deleted permanently.'};
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-dialog-centered custom-delete-user-modal modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState,
    });

    this.modalRef.content.deleteData.subscribe(() => {
      this.deleteOrganization();
    });
  }

  deleteOrganization(){
    this.modalRef.content.isLoading = true;
    this.crudService.delete('organization', this.organizationId).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        this.modalService.hide();
        this.router.navigate(['/layout/organization'])
      } else {
        this.toast.error(response.message, "Error!")
      }
      this.modalRef.content.isLoading = false;
    }, error => {
      this.toast.error(error.error.message, "Error!");
      this.modalRef.content.isLoading = true;
    });
  }

  closeModal(): void {
    this.modalRef?.hide();
    this.modalOpen = false;
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
    if (this.inviteMemberForm.invalid) {
      this.inviteMemberForm.markAllAsTouched();
      return;
    }
    const data = {
      email: this.inviteMemberForm.get('email')?.value,
      path: '/layout/team-member/register',
      organization: this.organizationId
    }
    this.crudService.create('auth/invite', data).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
          this.toast.success(response.message, "Success!")
          this.closeModal();
      } else {
        this.toast.error(response.message, "Error!")
      }
    }, error => {
      this.toast.error(error.error.message, "Error!")
    });
  }

  onValueChange() {
   const data = {
    status: this.organizationStatus
   }

   this.crudService.update('organization', this.organizationId, data).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        this.toast.success(response.message, "Success!")
      } else {
        this.toast.error(response.message, "Error!")
      }
    }, error => {
      this.toast.error(error.error.message, "Error!")
    });
  }


}
