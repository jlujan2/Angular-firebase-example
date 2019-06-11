import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BookService } from '../book-service.service';
import {MatTableDataSource} from '@angular/material';
import { Book } from '../book/book.model';
import { AuthService } from '../AuthService.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  booksCols = ['name', 'author', 'description'];
  dataSource: MatTableDataSource<Book>;
  isAdmin: boolean;
  email: string;


  constructor(private bookService: BookService, private authService: AuthService) {
  }

  ngOnInit() {
    this.email = this.authService.user.email;
    this.isAdmin = this.authService.isAdmin();
    this.bookService.getBooks()
      .subscribe(data => {
        let booksRef: Book[];
        booksRef = data;
        this.dataSource = new MatTableDataSource(booksRef);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

export class BoardDataSource extends DataSource<any> {

  constructor(private bookService: BookService) {
    super();
  }

  connect() {
    return this.bookService.getBooks();
  }

  disconnect() {

  }
}
