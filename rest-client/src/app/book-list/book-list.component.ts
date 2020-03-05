import { Component, OnInit } from '@angular/core';

import { DataService, Book } from '../data.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books:Book[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBooks().subscribe(bookList => {
      this.books = bookList
    })
  }

}
