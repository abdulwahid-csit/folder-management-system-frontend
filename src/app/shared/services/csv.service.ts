import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class FypDataExportService {

  exportToExcel(fyps: any[], filename: string = 'data.xlsx') {
    debugger
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.formatData(fyps));
    const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ['data'] };

    XLSX.writeFile(wb, filename);
  }

  private formatData(fyps: any[]) {
    return fyps.map((record, i) => ({
      Group: i + 1,
      Projects: record?.fypName,
      Members: record?.members.map((member: any) => member?.name).join(', '),
      'Average Marks': this.calculateAverageMarks(record?.members),
      'Average Attendance(%)': this.getAverageAttendence(
        record?.members,
        record?.meetings
      ),
      Meetings: record?.attendance?.length,
      Comments: record?.fypDescription,
      Eligible:
        this.getElegibilityPercentage(record?.members, record?.meetings) < 80
          ? 'Ineligible'
          : 'Eligible',
    }));
  }

  private calculateAverageMarks(members: any[]): number {
    const totalMarks = members.reduce((sum, member) => sum + member.marks, 0);
    return totalMarks / members.length;
  }

  private getAverageAttendence(members: any[], meetings: any[]): number {
    const totalAttendances = members.reduce((sum, member) => {
      const memberAttendance = meetings.filter((meeting) =>
        meeting.attendees.includes(member.id)
      ).length;
      return sum + (memberAttendance / meetings.length) * 100;
    }, 0);
    return totalAttendances / members.length;
  }

  private getElegibilityPercentage(members: any[], meetings: any[]): number {
    const totalAttendances = members.reduce((sum, member) => {
      const memberAttendance = meetings.filter((meeting) =>
        meeting.attendees.includes(member.id)
      ).length;
      return sum + (memberAttendance / meetings.length) * 100;
    }, 0);
    return totalAttendances / members.length;
  }
}
