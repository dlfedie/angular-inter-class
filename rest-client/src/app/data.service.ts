import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, retryWhen, delay, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  bookCache: {[isbn: string]: Book} = {}
  
  constructor(private http: HttpClient) { }

  getBooks() : Observable<Book[]> {
    return this.http.get<Book[]>("/books")
  }

  getBook(isbn: string) : Observable<Book> {
    let cachedBook = this.bookCache[isbn];
    if (cachedBook !== undefined) {
      console.log('Got a cache hit');
      return of(cachedBook)
    }
    return this.http.get<Book>(`books/${isbn}`).pipe(
      tap(book => this.bookCache[isbn] = book), //populate cache
      catchError(err => cachedBook ? of(cachedBook) : throwError(err))
    )
  }

  deleteBook(isbn: string) : Observable<any> {
    return this.http.delete(`/books/bad-url/${isbn}`).pipe(
      tap(_ => delete this.bookCache[isbn]),
      catchError((err:HttpErrorResponse) => {
        console.log('error here:', err);
        if(err.status == 504) {
          return throwError("Oops! Please check your network connection and try again.")
        } else {
          return throwError("Sorry, there was a problem at the server.")
        }
      })
    )
  }

  saveBook(book: Book) : Observable<any> {
    return this.http.put(`/books/${book.isbn}`, book).pipe(
      tap(_ => this.bookCache[book.isbn] = book)
    )
  }

  
}

export class Book {
  isbn: string
  title: string
  price: number
}
