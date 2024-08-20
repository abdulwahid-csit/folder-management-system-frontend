import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UpdateApplicationComponent } from '../update-application/update-application.component';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent  {
  modalRef: any;
  modalOpen: boolean = false;
  selectedTab = 'features';
  id: any;




constructor(private modalService: BsModalService,
  private crudService: CrudService, private route: ActivatedRoute,){
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
  }

setSelectedTab(tab: string){
  this.selectedTab = tab;
  if(tab === 'applications'){
    // this.columns = this.applicationColumns;
  }else{
    // this.columns = this.columns = this.dataTable[0]?.data?.columns;
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


  closeModal(confirm:boolean): void {
    if(confirm){
      const id = this.id
      this.modalRef?.hide();
      this.modalOpen = false;
      this.crudService.delete('applications', id).subscribe((response: any) => {
        if (response.status_code === 200 || response.status_code === 201) {
            console.log("application deleted.")

        } else {
          console.error('delete failed:', response.message);
        }
      }, error => {

        console.error('HTTP error:', error);
      });



    }
    else {
      this.modalRef?.hide();
      this.modalOpen = false;
    }

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



  editApplication(){
    this.modalRef = this.modalService.show(UpdateApplicationComponent, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
    })
  }

}
