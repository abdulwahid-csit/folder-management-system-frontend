import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPermissionListComponent } from './roles-permission-list.component';

describe('RolesPermissionListComponent', () => {
  let component: RolesPermissionListComponent;
  let fixture: ComponentFixture<RolesPermissionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolesPermissionListComponent]
    });
    fixture = TestBed.createComponent(RolesPermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
