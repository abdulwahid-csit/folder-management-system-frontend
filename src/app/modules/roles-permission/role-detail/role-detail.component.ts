import { Permission } from './../../../shared/Interfaces/roles.interfaces';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { CreateRoleComponent } from '../create-role/create-role.component';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {
  role: any;
  modalRef: any;
  roleIdToDelete?: number;
  userData: any;
  firstFivePermissions: any[] = [];
  totalPermissions: any[] = [];
  isDropdownVisible = false;


  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private modalService: BsModalService,
    private router: Router,
    public localStoreService: LocalStoreService,
  ) { }

  ngOnInit(): void {
    this.fetchRoleDetails();
    console.log('Total Permissions in this role. ', this.totalPermissions);
    console.log('Five Permissions in this role. ',this.firstFivePermissions);
  }

  fetchRoleDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.crudService.read('access/roles', +id).subscribe((response: any) => {
        if (response.status_code === 200) {
          this.role = response.data;
          this.firstFivePermissions = [];
          this.totalPermissions = [];
          if(this.role?.permissions.length >= 5){
            for(let i = 0; i < this.role?.permissions.length; i++){
              if(i < 5){
                this.firstFivePermissions.push(this.role?.permissions[i])
              }else{
                this.totalPermissions.push(this.role?.permissions[i])
              }
          }
          }else{
            this.totalPermissions = this.firstFivePermissions;
            console.log("Permissions list is less then five");
          }
        } else {
          console.error('Failed to fetch role details:', response.message);
        }
      }, error => {
        console.error('HTTP error:', error);
      });
    }
  }

  openUpdateModal(): void {
    this.modalRef = this.modalService.show(CreateRoleComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        mode: 'update',
        userData: this.role
      }
    });

    this.modalRef.onHidden?.subscribe(() => {
      this.fetchRoleDetails();
    });
  }

  closeModal(): void {
    this.modalRef?.hide();
  }


  userDeleteModal(): void {
    if (!this.role?.id) {
      console.error('No role data available for deletion.');
      return;
    }
    this.roleIdToDelete = this.role.id;

    const initialState = { description: 'Please confirm you really want to delete the role. After clicking yes, the role will be deleted permanently.' };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-dialog-centered custom-delete-user-modal modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState,
    });

    this.modalRef.content.deleteData.subscribe(() => {
      this.confirmDelete();
    });
  }

  confirmDelete(): void {
    // if(this.role.application_count || this.role.user_count){
    //   this.toast.error('You cannot delete the organization because it has associated users or applications.', "Error!")
    //   return;
    // }
    if (this.roleIdToDelete != null) {
      this.crudService.delete('access/roles', this.roleIdToDelete).subscribe(
        () => {
          this.closeModal();
          this.router.navigate(['/layout/roles']);
        },
        (error) => {
          console.error('Error deleting role:', error);
        }
      );
    }
  }

  showDropdown() {
    this.isDropdownVisible = true;
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }
}
