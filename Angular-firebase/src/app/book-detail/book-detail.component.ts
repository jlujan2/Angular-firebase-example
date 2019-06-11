import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book-service.service';
import { Book } from '../book/book.model';
import { AuthService } from '../AuthService.service';
import { User } from '../book/user.model';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book = {};
  isAdmin: boolean;
  currentUser: User;
  curBook: Book;

  constructor(private route: ActivatedRoute, private router: Router,
    private bookService: BookService, private authService: AuthService, private userService: UserServiceService) { }

  ngOnInit() {
    this.getBookInfo(this.route.snapshot.params['id']);
    this.isAdmin = this.authService.isAdmin();
    this.currentUser = this.authService.user;
  }

  addBookToUser(days: number) {
    const now = new Date();
    now.setDate(now.getDate() + +days);
    const book = {
      'id' : this.book['id'],
      'name' : this.book['name'],
      'author' : this.book['author'],
      'category' : this.book['category'],
      'dateReceived' : new Date,
      'dateToReturn' : now,
    };
    this.currentUser.books.push(book);
    this.curBook.copies -= 1;
    this.bookService.updateBook(this.curBook.id, this.curBook).subscribe(
      res => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
    this.userService.updateUser(this.currentUser);
    this.router.navigate(['/books']);
  }

  getBookInfo(id) {
    this.bookService.getBook(id)
      .subscribe(data => {
        this.book = data;
        this.curBook = data;
      });
  }

  deleteBook(id) {
    this.bookService.deleteBook(id)
      .subscribe(data => {
        console.log(data);
      });
    this.router.navigate(['/books']);
  }
}
