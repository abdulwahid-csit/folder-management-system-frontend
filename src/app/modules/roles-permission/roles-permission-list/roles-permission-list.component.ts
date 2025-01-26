import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { format } from 'crypto-js';
import { SocketService } from 'src/app/shared/services/socket.io.service';
import { FypDataExportService } from '../../../shared/services/csv.service'; 
@Component({
  selector: 'app-roles-permission-list',
  templateUrl: './roles-permission-list.component.html',
  styleUrls: ['./roles-permission-list.component.scss'],
})
export class RolesPermissionListComponent implements OnInit, OnDestroy {
  @ViewChild('shareForm') shareForm!: TemplateRef<any>;

  columns: any = [];
  roleslist: any = [];
  modalRef?: BsModalRef;
  searchTerm: string = '';
  activeMenu: string = 'Dashboard';
  searchType: boolean = false;
  selectedTab = 'details';

  tableConfig = {
    paginationParams: {
      total_pages: 0,
      payload_size: 0,
      has_next: false,
      current_page: 1,
      skipped_records: 0,
      total_records: 0,
    },
  };

  selectedMember = 1;
  isLoading = false;
  form!: FormGroup;
  @ViewChild('addCustomFile') addCustomFile!: TemplateRef<any>;

  shareFypsForm!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private crudService: CrudService,
    public localStoreService: LocalStoreService,
    public toastService: ToastrService,
    private router: Router,
    private toast: ToastrService,
    private socketService: SocketService,
    private exportToExcel: FypDataExportService
  ) {}

  ngOnInit(): void {
    this.getAllFyp();
    this.getSharedFyps();
    this.initForm();

    this.shareFypsForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      folderId: new FormControl(''),
    });
    this.getSharedFyps();
    // this.connectSocket();
    this.socketService.disconnect();
  }
  folderNotification: any;
  // connectSocket() {
  //   this.socketService.listenForFolderShared().subscribe((data: any) => {
  //     console.log('Folder shared event received:', data);
  //     this.folderNotification = data;
  //   });
  // }

  closeModal() {
    this.modalService.hide();
    this.form.reset();
    this.edit = false;
  }

  initForm() {
    this.form = new FormGroup({
      fypName: new FormControl('', Validators.required),
      fypMembersCount: new FormControl(1, Validators.required),
      fypDescription: new FormControl(''),
      endDate: new FormControl('2025-01-31'),
      status: new FormControl('In Progress'),
      session: new FormControl(''),
      meetings: new FormControl(16),
      members: new FormArray([]),
    });
    this.addMember();
  }

  editMode = false;
  submit() {
    console.log('Submit form.');
    console.log(this.form.value);
    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   this.toastService.show('Please fill all the required fields.');
    //   return;
    // }
    let apiCall: any;
    if (this.edit) {
      apiCall = this.crudService.update(
        'fyp/update-fyp',
        this.fypId,
        this.form.value
      );
    } else {
      apiCall = this.crudService.create('fyp/create-fyp', this.form.value);
    }

    apiCall.subscribe(
      (res: any) => {
        console.log('res;', res);
        if (this.edit) {
          this.toastService.success('FYP updated successfully.');
        } else {
          this.toastService.success('FYP created successfully.');
        }
        this.getAllFyp();
        this.closeModal();
      },
      (error: any) => {
        this.toastService.error('Error while creating fyp');
      }
    );
  }

  get members() {
    return this.form.get('members') as FormArray;
  }

  addMember() {
    if (this.members.length == this.selectedMember) {
      return;
    }
    const memberFormGroup = new FormGroup({
      rollNo: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]), // Basic phone validation
    });

    console.log('Member: ', memberFormGroup);
    this.members.push(memberFormGroup);
  }

  removeMember(index: number) {
    this.members.removeAt(index);
  }

  onMembersSelect(value: any) {
    this.selectedMember = value.target.value;
    if (this.selectedMember == 1) {
      this.members.clear();
      this.addMember();
    } else if (this.selectedMember == 2) {
      this.members.clear();
      this.addMember();
      this.addMember();
    } else if (this.selectedMember == 3) {
      this.members.clear();
      this.addMember();
      this.addMember();
      this.addMember();
    }
  }

  filterData: any;
  folder: any[] = [];
  openDeleteModal(message: string) {}

  addGroup() {
    this.modalRef = this.modalService.show(this.addCustomFile, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content?.event.subscribe(() => {
      // this.getFolder();
    });
  }

  fyps: any[] = [];
  getAllFyp() {
    this.crudService.read('fyp/').subscribe(
      (res) => {
        console.log(res);
        this.fyps = res?.fyps;
      },
      (error) => {
        console.log('Error');
      }
    );
  }

  gotoDetails(id: string) {
    this.router.navigate(['layout/fyp/details', id]);
  }

  folderId!: string;
  shareFolder(folderId: string) {
    this.folderId = folderId;
    this.modalRef = this.modalService.show(this.shareForm, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
    });
  }

  sharedFyps: any;
  getSharedFyps() {
    this.crudService.read('fyp/shared-fyps', null, undefined, 5).subscribe(
      (res) => {
        this.sharedFyps = res?.data;
        console.log('sharedFyps: ', this.sharedFyps);
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  submitShareFolder() {
    if (this.shareFypsForm.invalid) {
      this.shareFypsForm.markAllAsTouched;
      this.toast.error('Please enter a valid email address.');
      return;
    }
    let input = {
      email: this.shareFypsForm.get('email')?.value,
      fypId: this.folderId,
    };
    this.isLoading = true;
    this.crudService.create('fyp/share-fyp', input).subscribe(
      (res) => {
        this.isLoading = false;
        console.log('response => ', res);
        this.closeModal();
        this.toast.success('FYP Shared successfully.');
      },
      (error) => {
        this.isLoading = false;
        this.toast.error('Already shared with this user');
        // console.log('error: ', error?.Error);
      }
    );
  }

  fyp: any;
  edit = false;
  fypId!: string;
  getFypById(id: string) {
    this.fypId = id;
    this.edit = true;
    this.crudService.read('fyp/fyp', id).subscribe(
      (res) => {
        this.fyp = res?.fyp;
        this.form.patchValue(this.fyp);
        console.log('Fyp by id is: ', this.fyp);
        let formattedDate = moment(res?.fy?.endDate).format('YYYY-MM-DD');
        this.form.get('endDate')?.setValue(formattedDate);
        this.addGroup();
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  ngOnDestroy(): void {
    // this.socketService.disconnect();
  }

  setSelectedTab(tab: string) {
    this.selectedTab = tab;
  }

  validateInput(event: any) {
    let enteredNumber = event?.target?.value;
    if (enteredNumber > 32) {
      this.form.get('meetings')?.setValue(32);
    } else {
      this.form.get('meetings')?.setValue(Math.abs(enteredNumber));
    }
    if (enteredNumber == 0) {
      this.form.get('meetings')?.setValue(1);
    }
  }

  calculateAverageMarks(members: any[]) {
    const totalMarks = members.reduce(
      (sum: any, member: { marks: any }) => sum + member.marks,
      0
    );
    return (totalMarks / (members?.length * 100)) * 100;
  }

  getTotoalMarks(members: any[]) {
    const totalMarks = members.reduce(
      (sum: any, member: { marks: any }) => sum + member.marks,
      0
    );
  }

  getAverageAttendence(members: any[], requiredMeetings: number) {
    const totalMeetings = members.reduce(
      (sum: any, member: { attendeceCount: any }) =>
        sum + member?.attendeceCount,
      0
    );

    return (totalMeetings / requiredMeetings) * 100;
  }

  getAllMeetings(members: any[]) {
    return members.reduce(
      (sum: any, member: { attendeceCount: any }) =>
        sum + member?.attendeceCount,
      0
    );
  }

  getElegibilityPercentage(members: any, meetings: number) {
    let totalMarks = this.calculateAverageMarks(members);
    let meetingsPercntage = this.getAverageAttendence(members, meetings);

    return totalMarks + meetingsPercntage / 2;
  }

  exportData() {
    this.exportToExcel.exportToExcel(this.fyps);
  }
}
