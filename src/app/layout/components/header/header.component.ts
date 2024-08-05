import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSidebarVisible = false;

  constructor(private commonService:CommonService){ }

  ngOnInit(): void {
    this.commonService.sidebarVisible$.subscribe((visible)=>{
      this.isSidebarVisible = visible;
    })
  }

  toggleSidebar(){
    this.commonService.toggleSidebar();
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.openFullscreen();
    }
  }

  openFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).mozRequestFullScreen) { /* Firefox */
      (elem as any).mozRequestFullScreen();
    } else if ((elem as any).webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) { /* IE/Edge */
      (elem as any).msRequestFullscreen();
    }
  }

  ngOnDestroy() {
    
  }
}
