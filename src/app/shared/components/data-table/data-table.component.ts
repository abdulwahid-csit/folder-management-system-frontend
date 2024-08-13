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
 @Input() set module(value: string) {
  this._moduleName = value;
}

get module(): string {
  return this._moduleName;
}

 constructor(private modalService: BsModalService, private router:Router){ }

 ngOnInit(): void { console.log('module name in ngoninit', this.module) }

 ngOnChanges(changes: SimpleChanges) {
   // this.columns =[
  //   {
  //     title:"Created By",
  //     name: "createdBy"
  //   },
  //   {
  //     title: "Description",
  //     name: "description"
  //   }
  // ]
  // console.log('columns',this.columns);
  // console.log('dataSet',this.dataSet);
  if (changes['searchTerm'] || changes['dataSet']) {
    this.filteredData();
  }
  console.log('module name in onchanges', this.module)
}

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
