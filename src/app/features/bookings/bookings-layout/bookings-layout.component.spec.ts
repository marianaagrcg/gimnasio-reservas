import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsLayoutComponent } from './bookings-layout.component';

describe('BookingsLayoutComponent', () => {
  let component: BookingsLayoutComponent;
  let fixture: ComponentFixture<BookingsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingsLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
