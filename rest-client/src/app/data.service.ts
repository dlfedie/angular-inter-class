import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getBooks() : Observable<Book[]> {
    return this.http.get<Book[]>("/books")
  }

  getBook(isbn: string) : Observable<any> {
    return this.http.get<Book>(`books/$isbn`)
  }

  deleteBook(isbn: string) : Observable<any> {
    return this.http.delete(`/books/$isbn`)
  }

  saveBook(book: Book) : Observable<any> {
    return this.http.put(`/books/$(book.isbn)`, book)
  }

  constructor(private http: HttpClient) { }
}

export class Book {
  isbn: string
  title: string
  price: number
}
