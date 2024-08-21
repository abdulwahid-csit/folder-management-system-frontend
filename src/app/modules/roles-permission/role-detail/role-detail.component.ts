import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { CreateRoleComponent } from '../create-role/create-role.component';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';

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

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchRoleDetails();
  }

  fetchRoleDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.crudService.read('access/roles', +id).subscribe((response: any) => {
        if (response.status_code === 200) {
          this.role = response.data;
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
}
