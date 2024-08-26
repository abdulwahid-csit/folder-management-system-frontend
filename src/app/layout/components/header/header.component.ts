import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSidebarVisible = false;
  isDetailsPage = false;
  showSettingsIcon = true;
  isDropdownVisible = false;
  isDashboard = false;
  userName: string = '';
  userRole: string = '';


  constructor(
    private commonService:CommonService,
    private router: Router,
    public localStoreService: LocalStoreService,
    private elRef: ElementRef,private route: ActivatedRoute
  ){ }


  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateVisibilityAndRouteFlags();
    });

    this.commonService.sidebarVisible$.subscribe((visible)=>{
      this.isSidebarVisible = visible;
    })

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {

      this.isDetailsPage = event.urlAfterRedirects.includes('/details');
      console.log("here is the details page",this.isDetailsPage);
    })

    this.userName = this.localStoreService.getUserName();
    this.userRole = this.localStoreService.getUserRole();
    this.route.queryParamMap.subscribe()
  }

  toggleSidebar(){
    this.commonService.toggleSidebar();
  }

  toggleFullscreen() {
    console.log("Full scree button pressed.")
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

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  private updateVisibilityAndRouteFlags() {
    const currentRoute = this.router.url;
    this.showSettingsIcon = !currentRoute.includes('dashboard');
    this.isDashboard = currentRoute.includes('dashboard');
  }

  logout() {
    this.localStoreService.removeItem();
    this.router.navigate(['/login'])
  }
  navigate(){
    this.router.navigate(['layout/dashboard/settings']);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }

}
