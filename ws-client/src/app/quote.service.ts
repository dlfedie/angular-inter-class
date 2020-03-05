import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor() { }
}

export class Quote {
  ticker: string
  exchange: string
  price: string
  change: string
}
