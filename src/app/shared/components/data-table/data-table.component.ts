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
 @Input() columns:any
 @Input() config:any
 @Input() dataSet: any[] = [];
//  @Input() module!:string;
 @Input() searchTerm: string = '';
 totalPages = 2;
 currentPage = 1;
 modalRef?: BsModalRef;
 searchResults: any[] = [];
 searchFilter:boolean = false
 maintainStationList:any = []
 filterData: any[] = [];
 private _moduleName!: string;
  
  columnNameMap: any = {
    user_count: 'Users',
    application_count: 'Total No of Applications',
    created_at: 'Creation Date'
  };
 
 @Input() set module(value: string) {
  this._moduleName = value;
}

get module(): string {
  return this._moduleName;
}

 constructor(private modalService: BsModalService, private router:Router){ }

 ngOnInit(): void { 
}

 ngOnChanges(changes: SimpleChanges) {
  if (changes['searchTerm'] || changes['dataSet']) {
    this.filteredData();
  }
}

getUpdatedColumns() {
  return this.columns.map((column: string | number) => {
    return this.columnNameMap[column] || column;
  });
}

  filteredData() {
    if (!this.searchTerm) {
      this.filterData = this.dataSet;
    }
    const lowercasedSearchTerm = this.searchTerm.toLowerCase();
    this.filterData = this.dataSet.filter((item:any) =>
      Object.values(item).some(value => {
        if (value === null || value === undefined) {
          return false;
        }
        return value.toString().toLowerCase().includes(lowercasedSearchTerm);
      })
    );
  }

  onRowClick(rowData: any) {
    let detailRoute: string;
    if(this.module === 'dashboard'){
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
  
}
