import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.scss']
})
export class TeamMemberListComponent implements OnInit {
 
  constructor() {}
  date!: string;
  days: any[] = [];
  ngOnInit() {
    this.date = new Date().toISOString();
    console.log('Date:', this.date);
    this.getMonthDays();
  }

  getMonthDays() {
    let date = new Date();
    let nextDate = new Date(date);
     
     console.log('next date: ', nextDate.toISOString());
    // console.log('date next: ', date.setMilliseconds)
    for(let i = 0; i < 31; i++){
      nextDate.setDate(nextDate.getDate() + 1);
      this.days.push(nextDate.toISOString());
    }
    this.days.push(this.date)
    console.log('30 days: ', this.days);
  }

}
