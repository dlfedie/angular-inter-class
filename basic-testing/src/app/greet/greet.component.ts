import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../simple.service';

@Component({
  selector: 'app-greet',
  templateUrl: './greet.component.html',
  styleUrls: ['./greet.component.css']
})
export class GreetComponent implements OnInit {
  userName:string = '';

  constructor(private service: SimpleService) { }

  ngOnInit() {
  }

  getGreeting() : string {
    return this.service.sayHello(this.userName)
  }

}
