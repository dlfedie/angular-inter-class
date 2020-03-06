import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleService } from '../simple.service';
import { FormsModule } from '@angular/forms';

import { GreetComponent } from './greet.component';

describe('GreetComponent', () => {
  let component: GreetComponent;
  let fixture: ComponentFixture<GreetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GreetComponent],
      imports: [FormsModule],
      providers: [SimpleService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get greeting', () => {
    component.userName = 'Daffy Duck'
    
    expect(component.getGreeting()).toBe('Hello Daffy Duck')
  });

  it('handle state change', () => {
    component.userName = 'Bob'

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('p').textContent)
      .toBe('Hello Bob');
  });
  
});
