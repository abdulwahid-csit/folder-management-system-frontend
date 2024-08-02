import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isSidebarVisible = false;

  constructor(private commonService:CommonService){ }

  activeMenu: string = 'Dashboard';  // To track the active menu item

  setActive(menu: string): void {
    this.activeMenu = menu;
  }

  ngOnInit(): void {
    this.commonService.sidebarVisible$.subscribe(visible => {
      this.isSidebarVisible = visible;
    });
  }

}
