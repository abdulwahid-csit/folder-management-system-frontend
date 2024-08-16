import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CreateOrganizationComponent } from 'src/app/modules/organization/components/create-organization/create-organization.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() columns: any[] = [];
  @Input() config: any = {};
  @Input() dataSet: any[] = [];
  @Input() searchTerm: string = '';
  @Input() module: string = '';  // Ensure this line is present
  
  totalPages = 2;
  currentPage = 1;
  modalRef?: BsModalRef;
  searchResults: any[] = [];
  searchFilter: boolean = false;
  maintainStationList: any[] = [];
  filterData: any[] = [];

  constructor(private modalService: BsModalService, private router: Router) { }

  ngOnInit(): void {
    console.log('module name in ngoninit', this.module);
    console.log("this.dataSet", this.dataSet);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm'] || changes['dataSet']) {
      this.filteredData();
    }
    console.log('module name in onchanges', this.module);
  }

  createOrganization() {
    this.modalRef = this.modalService.show(CreateOrganizationComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg create_organization',
      backdrop: 'static',
      keyboard: false,
    });
  }

  filteredData() {
    if (!this.searchTerm) {
      this.filterData = this.dataSet;
    } else {
      const lowercasedSearchTerm = this.searchTerm.toLowerCase();
      this.filterData = this.dataSet.filter((item: any) =>
        Object.values(item).some(value =>
          value?.toString().toLowerCase().includes(lowercasedSearchTerm)
        )
      );
    }
  }

  onRowClick(rowData: any) {
    let detailRoute: string;
    if (this.module === 'dashboard') {
      return;
    }
    switch (this.module) {
      case 'organization':
      case 'roles':
      case 'application':
      case 'user':
      case 'secret':
      case 'team-member':
        detailRoute = `/layout/${this.module}/details/${rowData.id}`;
        break;
      default:
        detailRoute = '/';
        break;
    }
    console.warn(detailRoute);
    
    this.router.navigate([detailRoute]);
  }
  
}
