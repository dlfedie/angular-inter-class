import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getBooks() : Observable<Book[]> {
    return this.http.get<Book[]>("/books")
  }

  getBook(isbn: string) : Observable<Book> {
    return this.http.get<Book>(`books/${isbn}`)
  }

  deleteBook(isbn: string) : Observable<any> {
    return this.http.delete(`/books/${isbn}`).pipe(
      catchError((err:HttpErrorResponse) => {
        if (err.status == 0) {
          return throwError("Oops! Please check your network connection and try again.")
        } else {
          return throwError("Sorry, there was a problem at the server.")
        }
      })
    )
  }

  saveBook(book: Book) : Observable<any> {
    return this.http.put(`/books/${book.isbn}`, book)
  }

  constructor(private http: HttpClient) { }
}

export class Book {
  isbn: string
  title: string
  price: number
}
