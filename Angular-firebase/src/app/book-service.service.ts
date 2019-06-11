import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Book } from './book/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  ref = firebase.firestore().collection('books');
  book: Book;
  constructor() { }

  getBooks(): Observable<Book[]> {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        let books = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          this.book = new Book(doc.id, data.name, data.author, data.category, data.description, data.availability, data.imagePath, +data.rating, data.copies, data.isbn);
          books.push(
           this.book
          );
        });
        observer.next(books);
      });
    });
  }

  getBook(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc) => {
        let data = doc.data();
        observer.next({
          id: doc.id,
          author: data.author,
          name: data.name,
          description: data.description,
          availability: data.availability,
          category: data.category,
          imagePath: data.imagePath,
          rating: +data.rating,
          copies: +data.copies,
          isbn: data.isbn,
          reviews: data.reviews,
          ratingCount: data.ratingCount,
        });
      });
    });
  }

  saveBook(data): Observable<any> {
    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        observer.next({
          id: doc.id,
        });
      });
    });
  }

  updateBook(id: string, data): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }

  updateBookReturn(id: string, data): Observable<any> {
    data['copies'] = data['copies'] - 1;
    return new Observable((observer) => {
      this.ref.doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }

  deleteBook(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).delete().then((data) => {
        console.log(data);
      });
    });
  }

}
