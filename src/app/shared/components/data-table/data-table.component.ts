import { Component, Input, OnInit } from '@angular/core';
import { CreateOrganizationComponent } from 'src/app/modules/organization/components/create-organization/create-organization.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
 @Input() columns:any
 @Input() config:any
 @Input() dataSet:any
 totalPages = 100;
 currentPage = 1;
 modalRef?: BsModalRef;
 searchTerm: string = '';
 searchResults: any[] = [];
 searchFilter:boolean = false
 maintainStationList:any = []

 constructor(private modalService: BsModalService){ }
 ngOnInit(): void { console.log('pagination data:-', this.config.paginationParams.total_pages) }

 createOrganization() {
  // const initialState = { data, type: 'asset' };
  this.modalRef = this.modalService.show(CreateOrganizationComponent, {
    class: 'modal-dialog modal-dialog-centered modal-lg create_organization',
    backdrop: 'static',
    keyboard: false,
    // initialState,
  });
  // this.modalRef.content.event.subscribe((res) => {
  //   this.getAssetList();
  // });
}

  filteredData() {
    if (!this.searchTerm) {
      return this.dataSet;
    }

    const lowercasedSearchTerm = this.searchTerm.toLowerCase();
    
    return this.dataSet.filter((item:any) =>
      Object.values(item).some(value => {
        if (value === null || value === undefined) {
          return false;
        }
        // Convert to string and check if search term is included
        return value.toString().toLowerCase().includes(lowercasedSearchTerm);
      })
    );
  }
}
