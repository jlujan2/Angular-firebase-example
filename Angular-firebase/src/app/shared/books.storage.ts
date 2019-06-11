import { Book } from "../book/book.model";
import { Http } from "@angular/http";


export class BooksStorage {

    constructor(private http: Http) { }

    saveBook(book: Book) {
        
    }
}