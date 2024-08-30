import { Component, HostListener, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isSidebarVisible:boolean = false
  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
    this.commonService.sidebarVisible$.subscribe((visible:boolean) => {
      this.isSidebarVisible = visible;
    });
  }


  @HostListener('click', ['$event'])
  onClick(event: Event) {
    const width = window.innerWidth;
    let isSmallScreen = width < 1048;

    if (isSmallScreen) {
      let ele = event.target as HTMLElement;
    if((!(ele.classList.contains('sidebar-main') || ele.classList.contains('sidbar-logo-navigations'))) && this.isSidebarVisible == false){
    this.commonService.toggleSidebar();
    }
    if(ele.classList.contains('sidebar-toggle-div') || ele.classList.contains('rotate_icon')){
      this.commonService.toggleSidebar();
    }
    }
  }
}
