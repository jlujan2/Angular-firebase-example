import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BookService } from '../book-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  bookForm: FormGroup;
  book :{};
  id:string = '';
  name:string = '';
  author:string = '';
  description:string = '';
  availability: boolean;
  imagePath: string;
  rating: number;
  copies: number;
  isbn: string;

  constructor(private router: Router, private route: ActivatedRoute, private bookService: BookService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getBookInfo(this.route.snapshot.params['id']);
    this.bookForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'author': [null, Validators.required],
      'category': [null, Validators.required],
      'description': [null, Validators.required],
      'availability': [null, Validators.required],
      'imagePath': [null, Validators.required],
      'rating': [null, Validators.required],
      'copies': [null, Validators.required],
      'isbn': [null, Validators.required]

    });
  }

  getBookInfo(id) {
    this.bookService.getBook(id)
      .subscribe(data => {
        this.id = data.id;
        this.bookForm.setValue({
          name: data.name,
          author: data.author,
          category : data.category,
          description: data.description,
          availability: data.availability,
          imagePath: data.imagePath,
          rating: +data.rating,
          copies: +data.copies,
          isbn: data.isbn
        });
      });
  }

  booksDetails() {
    this.router.navigate(['/books-details', this.id]);
  }

  onEditBook(form:NgForm) {
    this.bookService.updateBook(this.id, form)
      .subscribe(response => {
        this.router.navigate(['/books']);
      },
      (error) => {
        console.log(error);
        }
      );
  }
}
