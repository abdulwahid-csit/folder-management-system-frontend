import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isSidebarVisible = false;
  userName: string = '';
  userRole: string = '';
  activeMenu: string = 'Dashboard';  // To track the active menu item

  constructor(
    private commonService:CommonService, 
    private router:Router,
    private localStoreService: LocalStoreService
  ){ }

  ngOnInit(): void {
    this.commonService.sidebarVisible$.subscribe(visible => {
      this.isSidebarVisible = visible;
    });

    this.userName = this.localStoreService.getUserName();
    this.userRole = this.localStoreService.getUserRole();
  }

  setActive(menu: string): void {
    this.activeMenu = menu;
  }

  navigate() {
    this.router.navigate(['/user']);
  }

  logout() {
    this.localStoreService.removeItem();
    this.router.navigate(['/login'])
  }
}
