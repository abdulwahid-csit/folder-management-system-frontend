import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

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

  // ngOnInit() {
  //   this.updatePagination();
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalPages'] || changes['dataSet']) {
      this.updatePagination();
    }
  }
  
  updatePagination() {
    this.paginationArray = [];
    if (this.totalPages) {
      for (let i = 1; i <= this.totalPages; i++) {
        this.paginationArray.push(i);
      }
    } else {
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
