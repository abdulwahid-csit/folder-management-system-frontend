import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateOrganizationComponent } from '../create-organization/create-organization.component';
import { OrganizationDetailsComponent } from '../organization-details/organization-details.component';
import { CrudService } from 'src/app/shared/services/crud.service';
import { AddOrganization, Organization, OrganizationState } from '../../state/organization.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent {
  @Select(OrganizationState.getOrganizations) users$!: Observable<Organization[]>;

  modalRef?: BsModalRef;
  searchTerm: string = '';
  searchType: boolean = false;

  constructor(
    private modalService: BsModalService,
    private crudService: CrudService,
    private store: Store,
    public localStoreService: LocalStoreService
  ) { }

  columns: any = []
  organizationList: any = []

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
    this.getOrganization(1);
  }

  getOrganization(currentPage: any) {
    let urlData = 'organization?page=${currentPage}&limit=10';
    if(this.searchType){
      urlData = `organization?page=${currentPage}&limit=10&search=${this.searchTerm}`;
    }else{
      urlData = `organization?page=${currentPage}&limit=10`;
    }

    this.crudService.read(urlData).subscribe((response: any) => {
      this.searchType = false;
      if (response.status_code === 200 || response.status_code === 201) {
        this.store.dispatch(new AddOrganization(response));
        if (response.data.payload.length > 0) {
          const column = Object.keys(response.data.payload[0]);
          this.columns = column.filter((column: string) => column !== 'id' && column !== 'logo' && column !== 'created_by' && column !== 'updated_by');
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
        }else{
          this.columns = [];
          this.organizationList = [];

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
      class: 'modal-dialog-centered common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState,
    });

    this.modalRef.content.successCall.subscribe(() => {
      this.getOrganization(1);
    });
  }
  onKeyChange(item: any){
    this.searchType = false;

   if(item.keyCode == 13){
      this.searchType = true;
      this.getOrganization(1);
    }else if(this.searchTerm == ''){
      this.getOrganization(1);
    }
  }
}
