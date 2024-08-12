import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSidebarVisible = false;
  isDetailsPage = false;
  constructor(private commonService:CommonService, private router: Router){ }

  ngOnInit(): void {
    this.commonService.sidebarVisible$.subscribe((visible)=>{
      this.isSidebarVisible = visible;
    })

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  // Only pass NavigationEnd events
    ).subscribe((event: any) => {
      // Check if the current URL is for the details page
      this.isDetailsPage = event.urlAfterRedirects.includes('/details'); // Adjust this path to your details route
      console.log("Current url incllude details page: ", this.isDetailsPage);
    });
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
