import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService.service';
import { User } from '../book/user.model';
import { UserServiceService } from '../user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book-service.service';

@Component({
  selector: 'app-book-issued',
  templateUrl: './book-issued.component.html',
  styleUrls: ['./book-issued.component.css']
})
export class BookIssuedComponent implements OnInit {

  user: User;
  displayedColumns: string[] = ['name', 'author', 'checkIn', 'returnDate', 'return', 'renew'];
  ELEMENT_DATA: any[];
  days: string;

  constructor(private authService: AuthService, private userService: UserServiceService, private route: ActivatedRoute,
    private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.getUserInfo(this.route.snapshot.params['id']);

  }

  getUserInfo(email) {
    this.userService.getUserByEmail(email)
    .subscribe(
      data => {
        this.user = data[0];
        this.ELEMENT_DATA = data[0].books;
      }
    );
  }

  returnBook(bookId) {
      const result = this.user.books.filter(book => book.id !== bookId);
      this.user.books = result;
      let returnBook;
      this.bookService.getBook(bookId)
        .subscribe( data => {
          returnBook = data;
        }
      );
      this.bookService.updateBookReturn(bookId, returnBook);
      this.userService.updateUser(this.user);
      this.router.navigate(['/review', bookId]);
    }

    addMoreDays(days, bookId) {
      const result = this.user.books.filter(book => book.id === bookId);
      const index = this.user.books.includes(book => book.id === bookId);
      this.user.books.splice(+index, 1);
      const newDateToReturn = new Date(result[0]['dateToReturn']);
      newDateToReturn.setDate(newDateToReturn.getDate() + (+days.value));
      result[0]['dateToReturn'] = newDateToReturn.toDateString();
      this.user.books.push(result[0]);
      this.userService.updateUser(this.user);
    }
}


