import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalPages!: number;
  @Input() currentPage!: number;
  @Output() currentPageChange = new EventEmitter<number>();
  paginationArray: (number | string)[] = [];
  previousClicked: boolean = false;
  nextClicked: boolean = false;

  ngOnInit() {
    this.updatePagination();
  }

  updatePagination() {
    this.paginationArray = [];
    console.log('oustide')
    if (this.totalPages) {
      console.log('if')
      for (let i = 1; i <= this.totalPages; i++) {
        this.paginationArray.push(i);
      }
    } else {
      console.log('else')
      if (this.currentPage) {
        this.paginationArray = [1, 2, 3, 4, 5, '...', this.totalPages];
      } else if (this.currentPage > this.totalPages - 4) {
        this.paginationArray = [1, '...', this.totalPages - 4, this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages];
      } else {
        this.paginationArray = [1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages];
      }
    }
  }

  goToPage(page: any) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.currentPageChange.emit(this.currentPage);
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.currentPageChange.emit(this.currentPage);
      this.updatePagination();
      this.previousClicked = true;
      this.nextClicked = false;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.currentPageChange.emit(this.currentPage);
      this.updatePagination();
      this.previousClicked = false;
      this.nextClicked = true;
    }
  }
}
