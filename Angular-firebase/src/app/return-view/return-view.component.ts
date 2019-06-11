import { Component, OnInit } from '@angular/core';
import { BookService } from '../book-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book/book.model';
import { AuthService } from '../AuthService.service';
import { User } from '../book/user.model';

@Component({
  selector: 'app-return-view',
  templateUrl: './return-view.component.html',
  styleUrls: ['./return-view.component.css']
})
export class ReturnViewComponent implements OnInit {

  selected =  1;
  review: string;
  bookId: string;
  book: Book;

  constructor(private bookService: BookService, private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.bookId = this.route.snapshot.params['id'];
    this.bookService.getBook(this.bookId).subscribe(
      data => {
        this.book = data;
      }
    );
  }

  submitReview(value) {
    let newRating: number;
    this.book.reviews.push(this.review);
    this.book.rating = this.selected;
    newRating = ((this.book.rating * this.book.ratingCount) + (+this.selected)) / (this.book.ratingCount + 1);
    this.book.rating = newRating;
    this.book.ratingCount = this.book.ratingCount + 1;
    this.bookService.updateBook(this.bookId, this.book).subscribe(
      (error) => {
        console.log(error);
      }
    );

    this.router.navigate(['/profile', this.authService.user.email]);
  }

}
