import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  activeMenu: string = 'Dashboard';  // To track the active menu item

  setActive(menu: string): void {
    this.activeMenu = menu;
  }

}
