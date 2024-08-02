import { Component, OnInit } from '@angular/core';
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
}
