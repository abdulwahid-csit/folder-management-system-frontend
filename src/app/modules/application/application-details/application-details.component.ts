import { Component, Input, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { CreateApplicationComponent } from '../create-application/create-application.component';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent {
  @Input() itemList: any;
  @Input() organizationId: number = 0;
  @Input() title: string = '';
  modalRef: any;
  modalOpen: boolean = false;
  selectedTab = 'features';
  applicationID: any;
  app_secret: string | undefined;
  app_id!: string;
  applicationData: any = {};

  constructor(
    private modalService: BsModalService,
    private crudService: CrudService, 
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    public localStoreService: LocalStoreService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.applicationID = params['id'];
    });
    this.applicationListing()
  }

  setSelectedTab(tab: string) {
    this.selectedTab = tab;
    if (tab === 'applications') {
      // this.columns = this.applicationColumns;
    } else {
      // this.columns = this.columns = this.dataTable[0]?.data?.columns;
    }
  }

  applicationListing() {

    this.crudService.read('applications/' + this.applicationID).subscribe((response: any) => {
      {
        this.app_secret = response.data.app_secret;
        this.app_id = response.data.app_id;
        this.applicationData = response.data;
      }

    }, error => {
      console.error('HTTP error:', error);
    });
  }

  applicationDeleteModal(): void {
    const initialState = { description: 'Please confirm you really want to delete the organization. After clicking yes, the organization will be deleted permanently.' };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-dialog-centered custom-delete-user-modal modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState,
    });

    this.modalRef.content.deleteData.subscribe(() => {
      this.deleteApplication();
    });
  }

  deleteApplication() {
    this.crudService.delete('applications', this.applicationID).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        debugger
        this.modalService.hide();
        this.router.navigate(['/layout/application'])
      } else {
        this.toast.error(response.message, "Error!")
      }
    }, error => {
      this.toast.error(error.error.message, "Error!")
    });
  }

  openModal(template: TemplateRef<any>, classes: string): void {
    this.modalRef = this.modalService.show(template, {
      class: classes,
      backdrop: 'static',
      keyboard: false,

    });
    this.modalOpen = true;
  }

  regeneratKey(confirm: boolean): void {
    if (confirm) {
      const body = {};
      this.crudService.update('applications', this.applicationID, body, 'secret/regenerate').subscribe(
        (response: any) => {
          if (response.status_code === 200 || response.status_code === 201) {
            this.applicationData.app_secret = response.data.app_secret;
          } else {
            this.toast.error(response.message, "Error!");
          }
        },
        error => {
          this.toast.error(error.error.message, "Error!");
        }
      );
    }
    this.modalRef?.hide();
    this.modalOpen = false;
  }



  copyId(spanRef: HTMLElement, copySvg: HTMLElement, tickIcon: HTMLElement, selectedInput: HTMLInputElement) {
    copySvg?.classList.add('d-none');
    spanRef?.classList.add('pe-none');
    selectedInput.select();
    navigator.clipboard.writeText(selectedInput.value)
    if (tickIcon?.classList.contains('d-none'))
      tickIcon?.classList.remove('d-none');

    setTimeout(() => {
      if (copySvg?.classList.contains('d-none'))
        copySvg?.classList.remove('d-none');

      if (spanRef?.classList.contains('pe-none'))
        spanRef?.classList.remove('pe-none');

      tickIcon?.classList.add('d-none');
    }, 1500);
  }



  editApplication() {
    const initialState = {itemList: this.applicationData, title: 'Edit', applicationID: this.applicationID};
    // const initialState = {
    //   applicationId: this.applicationID,
    // };
    this.modalRef = this.modalService.show(CreateApplicationComponent, {
      initialState,
      class: 'modal-dialog modal-dialog-centered modal-lg create_organization',
      backdrop: 'static',
      keyboard: false,
    });

      this.modalRef.content.successCall.subscribe(() => {
        this.applicationListing();
      });
  }

}
