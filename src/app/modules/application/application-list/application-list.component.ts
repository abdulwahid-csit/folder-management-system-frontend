import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApplicationDetailsComponent } from '../application-details/application-details.component';
import { CreateApplicationComponent } from '../create-application/create-application.component';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent {
  constructor(
    private modalService: BsModalService,
    private crudService: CrudService,
    private localStoreService: LocalStoreService
  ){}
  ngOnInit(): void {
    this.applicationListing(1)
  }


  columns:any = []
  applicationList:any = {}
  total_pages = 10;
  payload_size = 10;
  current_page = 1
  has_next= false
  skipped_records = 0
  total_records = 7
  modalRef?: BsModalRef;
  searchTerm: string = '';
  searchType: boolean = false;


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

    applicationListing(currentPage: any) {
      let urlData = `applications?page=${currentPage}&limit=10`;
      if(this.localStoreService.getUserRole().toLowerCase() !== 'master'){
        urlData += `&organization=${this.localStoreService.getUserOrganization()}`;
      }

      if(this.searchType){
        urlData += `&search=${this.searchTerm}`;
      }

      this.crudService.read(urlData).subscribe((response: any) => {
       if (response.status_code === 200 || response.status_code === 201) {
          if (response.data.payload.length > 0) {
            const column = Object.keys(response.data.payload[0]);
            this.columns = column.filter((column: string) => column !== 'id' &&
              column !== 'email_verified' && column !== 'permissions' && column !== 'timezone' && column !=='created_by' &&
              column !== 'updated_by' && column !== 'username' && column !== 'updated_at' && column !== 'profile_picture' && column !== 'last_name');
            this.applicationList = response.data.payload;

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

    createApplication() {
      // const initialState = { data, type: 'asset' };
      this.modalRef = this.modalService.show(CreateApplicationComponent, {
        class: 'modal-dialog modal-dialog-centered modal-lg create_organization',
        backdrop: 'static',
        keyboard: true,
        // initialState,
      });
      // this.modalRef.content.successCall.subscribe(() => {
      //   this.applicationListing(1);
      // });
    }

    onKeyChange(item: any){
      this.searchType = false;

      if(item.keyCode == 13){
        this.searchType = true;
        this.applicationListing(1);
      }else if(this.searchTerm == ''){
        this.applicationListing(1);
      }
    }
}
