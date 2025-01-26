import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSidebarVisible = false;
  isDetailsPage = false;
  showSettingsIcon = false;
  isDropdownVisible = false;
  isDashboard = false;
  isSowNotifications: boolean = false;
  notifications: any = [{ id: 1, title: 'New Todo Added', isRead: false }];

  private intervalId: any;
  constructor(
    private commonService: CommonService,
    private router: Router,
    public localStoreService: LocalStoreService,
    private elRef: ElementRef,
    private route: ActivatedRoute,
    private crudService: CrudService
  ) {}

  ngOnInit(): void {
    this.getNotifications();
    this.showSettingsIcon = !this.router.url.includes('dashboard');
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateVisibilityAndRouteFlags();
      });
    console.log('Profile Picture: ', this.localStoreService.getUserProfile());
    this.commonService.sidebarVisible$.subscribe((visible) => {
      this.isSidebarVisible = visible;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isDetailsPage = event.urlAfterRedirects.includes('/details');
      });

    this.intervalId = setInterval(() => {
      this.getNotifications();
    }, 3000);

  }

  toggleSidebar() {
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
    } else if ((elem as any).mozRequestFullScreen) {
      /* Firefox */
      (elem as any).mozRequestFullScreen();
    } else if ((elem as any).webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) {
      /* IE/Edge */
      (elem as any).msRequestFullscreen();
    }
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
    this.router.navigate(['/login']);
  }
  navigate() {
    this.router.navigate(['layout/dashboard/settings']);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isSowNotifications = false;
    }
  }

  options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  selectedOption!: string;

  selectOption(option: string): void {
    this.selectedOption = option;
    alert(`You selected: ${option}`);
  }

  toggleNotifications() {
    this.isSowNotifications = !this.isSowNotifications;
  }

  unreadNotifications: any;
  getNotifications() {
    this.crudService.read('notification/notifications').subscribe(
      (res) => {
        // console.log('res: -> ', res.notification);
        this.notifications = res.notification;
        this.unreadNotifications = this.notifications.filter(
          (item: { read: boolean }) => item.read == false
        );
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  markAsRead(id: string) {
    this.crudService.update('notification/read', id).subscribe(
      (res) => {
        this.getNotifications();
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  markAllAsRead() {
    this.crudService
      .update('notification/all-read', '6787cf0093cab320abf590f5')
      .subscribe(
        (res) => {
          this.getNotifications();
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }

  gotoNotification(url: string) {
    this.router.navigate([url]);
    this.isSowNotifications = false;
  }

  timeAgo(createdAt: any) {
    return moment(createdAt).fromNow();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

