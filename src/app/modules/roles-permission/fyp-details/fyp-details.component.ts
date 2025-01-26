import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-fyp-details',
  templateUrl: './fyp-details.component.html',
  styleUrls: ['./fyp-details.component.scss'],
})
export class FypDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private http: HttpClient,
    private toastService: ToastrService,
    private modalservice: BsModalService,
    private router: Router
  ) {}

  @ViewChild('addAttendence') addAttendence!: TemplateRef<any>;
  @ViewChild('addMarks') addMarks!: TemplateRef<any>;

  id!: any;
  fyp: any;
  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      this.id = res.get('id');
      console.log('id is', this.id);
      this.getFypById();
    });

    this.initForm();
  }

  form!: FormGroup;
  isLoading = false;
  initForm() {
    this.form = new FormGroup({
      studentNames: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date: new FormControl(''),
      file: new FormControl(''),
    });
  }

  submit() {
    console.log('Submit form.');
    console.log(this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.show('Please fill all the required fields.');
      return;
    }

    const studentNames = this.form.get('studentNames')?.value;
    const data = new FormData();
    data.append('fypId', this.id);
    data.append('studentNames', JSON.stringify(studentNames));
    data.append('date', this.form.get('date')?.value);
    data.append('description', this.form.get('description')?.value);
    data.append('file', this.file);


    console.log('data: ', data)


    this.crudService.createContent('fyp/add-attendance', data).subscribe(
      (res) => {
        console.log('res;', res);
        this.getFypById();
        this.toastService.success('Attendence added successfully.');
        this.closeModal();
      },
      (error) => {
        this.toastService.error('Error while creating fyp');
      }
    );
  }

  closeModal() {
    this.modalservice.hide();
  }

  getFypById() {
    this.crudService.read('fyp/fyp', this.id).subscribe(
      (res) => {
        this.fyp = res?.fyp;
        console.log('Fyp by id is: ', this.fyp);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  modalRef!: BsModalRef;
  dateForEdit: any;
  addAttendenceModal(editData: any = '') {
    if (editData) {
      this.form.patchValue(editData);
      this.form.get('students')?.setValue(editData?.studentNames);
      this.form.get('date')?.setValue(editData?.date);
      this.form.get('file')?.setValue(editData?.file);
      this.dateForEdit = editData?.date;
    }
    this.modalRef = this.modalservice.show(this.addAttendence, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content?.event.subscribe(() => {
      // this.getFolder();
    });
  }

  addStudentsMarks() {
    this.modalRef = this.modalservice.show(this.addMarks, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content?.event.subscribe(() => {});
  }

  file!: File;
  OnFileChange(event: any) {
    this.file = event.target.files[0];
    console.log('File: ', this.file);
  }

  openDeleteModal() {
    const message = 'Are You want to delete this Group?';
    this.modalRef = this.modalservice.show(DeleteModalComponent, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        description: message,
      },
    });
    this.modalRef.content?.deleteData.subscribe(() => {
      this.deleteFyp();
    });
  }

  deleteAttendenceId: string = '';
  openDeleteAttendenceModal(id: string) {
    this.deleteAttendenceId = id;
    const message = 'Are You want to delete this Attendence?';
    this.modalRef = this.modalservice.show(DeleteModalComponent, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        description: message,
      },
    });
    this.modalRef.content?.deleteData.subscribe(() => {
      this.deleteFypAttendence();
    });
  }

  deleteFyp() {
    this.crudService.delete('fyp/fyp/delete', this.id).subscribe((res) => {
      console.log(res);
      this.toastService.success('Group deleted successfully.');
      this.closeModal();
      this.router.navigate(['layout/roles']);
    });
  }

  deleteFypAttendence() {
    this.crudService
      .delete(
        'fyp/fyp/deleteAttendence',
        this.id + '.' + this.deleteAttendenceId
      )
      .subscribe((res) => {
        console.log(res);
        this.toastService.success('Attendence deleted successfully.');
        this.closeModal();
        this.getFypById();
      });
  }

  downloadFile(fileName: string) {
    this.crudService.downloadFile(fileName);
  }

  saveMarks(){
    console.log(this.fyp?.members);
    this.crudService
      .update('fyp/update-members', this.fyp?._id, {
        members: this.fyp?.members,
      })
      .subscribe((res) => {
        console.log('Updated fyp: ', res);
        this.getFypById();
        this.closeModal();
        this.toastService.success('Marks Updated Successfully')
      });
  };
}
