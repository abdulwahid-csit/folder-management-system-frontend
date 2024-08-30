import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CreateOrganizationComponent } from 'src/app/modules/organization/components/create-organization/create-organization.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Output() changePage = new EventEmitter();
  @Input() columns: any;
  @Input() config: any;
  @Input() dataSet: any[] = [];
  //  @Input() module!:string;
  @Input() searchTerm: string = '';

  modalRef?: BsModalRef;
  searchResults: any[] = [];
  searchFilter: boolean = false
  maintainStationList: any = []
  filterData: any[] = [];
  private _moduleName!: string;

  columnNameMap: any = {
    user_count: 'Users',
    application_count: 'Total No of Applications',
    created_at: 'Creation Date',
    app_name: 'Name',
    app_id: 'App ID',
    first_name: 'Full Name',
    last_logged_in: ' Last Sign in'
  };

  @Input() set module(value: string) {
    this._moduleName = value;
  }

  get module(): string {
    return this._moduleName;
  }

  constructor(private modalService: BsModalService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm'] || changes['dataSet']) {
      this.filteredData();
    }
    console.log("CONFIG: ", this.config)
  }

  getUpdatedColumns() {
    return this.columns.map((column: string | number) => {
      return this.columnNameMap[column] || column;
    });
  }

  // filteredData() {
  //   if (!this.searchTerm) {
  //     this.filterData = this.dataSet;
  //   }
  //   const lowercasedSearchTerm = this.searchTerm.toLowerCase();
  //   this.filterData = this.dataSet.filter((item: any) =>
  //     Object.values(item).some(value => {
  //       if (value === null || value === undefined) {
  //         return false;
  //       }
  //       return value.toString().toLowerCase().includes(lowercasedSearchTerm);
  //     })
  //   );
  // }

  filteredData() {
    if (!Array.isArray(this.dataSet)) {
      // console.error('dataSet is not an array:', this.dataSet);
      this.filterData = []; // Clear filterData to avoid displaying incorrect data
      return;
    }

    if (!this.searchTerm) {
      this.filterData = this.dataSet;
    } else {
      const lowercasedSearchTerm = this.searchTerm.toLowerCase();
      this.filterData = this.dataSet.filter((item: any) =>
        Object.values(item).some(value => {
          if (value === null || value === undefined) {
            return false;
          }
          return value.toString().toLowerCase().includes(lowercasedSearchTerm);
        })
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
        detailRoute = `/layout/${this.module}/details/${rowData.id}`;
        break;
      case 'roles':
        detailRoute = `/layout/${this.module}/details/${rowData.id}`;
        break;
      case 'application':
        detailRoute = `/layout/${this.module}/details/${rowData.id}`;
        break;
      case 'user':
        detailRoute = `/layout/${this.module}/details/${rowData.id}`;
        break;
      case 'secret':
        detailRoute = `/layout/${this.module}/details/${rowData.id}`;
        break;
      case 'team-member':
        detailRoute = `/layout/${this.module}/details/${rowData.id}`;
        break;

      default:
        detailRoute = '/';
        break;
    }

    this.router.navigate([detailRoute]);
  }
  getOrganization(value: any) {
    if (value && typeof value === 'object') {
      return value.name;
    }
    return '';
  }

  getRole(value: any) {
    if (value && typeof value === 'object') {
      return value.name;
    }
    return '';
  }

  onPageChange(item: any){
    this.changePage.emit(item);
  }
}
