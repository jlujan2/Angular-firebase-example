import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BookService } from '../book-service.service';
import { Book } from '../book/book.model';

@Component({
  selector: 'app-book-save',
  templateUrl: './book-save.component.html',
  styleUrls: ['./book-save.component.css']
})
export class BookSaveComponent implements OnInit {

  bookForm: FormGroup;
  id:string = '';
  name:string = '';
  author:string = '';
  description:string = '';
  availability: boolean = false;
  imagePath: string;
  rating: number = 0;
  isbn: string = '';
  copies: number;

  constructor(private router: Router, private bookService: BookService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'author': [null, Validators.required],
      'category': [null, Validators.required],
      'description': [null, Validators.required],
      'availability': ['false', Validators.required],
      'imagePath': [null, Validators.required],
      'isbn': [null, Validators.required],
      'copies': [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    const name = form['name'];
    const author = form['author'];
    const category = form['category'];
    const description = form['description'];
    const availability = form['availability'];
    const imagePath = form['imagePath'];
    const copies = form['copies'];
    const isbn = form['isbn'];

    const book = new Book('0', name, author, category, description, false, imagePath, 0, copies, isbn);
    this.bookService.saveBook(JSON.parse(JSON.stringify(book)))
      .subscribe(res => {
        let id = res['id'];
        this.router.navigate(['/book-details', id]);
      }, (error) => {
        console.log(error);
      });
  }

}
