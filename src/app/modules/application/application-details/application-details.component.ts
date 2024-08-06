import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent {
  modalRef: any;
  modalOpen: boolean = false;
  selectedTab = 'features';




constructor(private modalService: BsModalService){}


setSelectedTab(tab: string){
  this.selectedTab = tab;
  if(tab === 'applications'){
    // this.columns = this.applicationColumns;
  }else{
    // this.columns = this.columns = this.dataTable[0]?.data?.columns;
  }
}


  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
    class: 'modal-dialog modal-dialog-centered common_modal_shadow',
    backdrop: 'static',
    keyboard: false,
    
    });
    this.modalOpen = true;
  }


  closeModal(): void {
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

}
