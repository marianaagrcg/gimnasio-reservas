import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingCardComponent } from './booking-card.component';

describe('BookingCardComponent', () => {
  let component: BookingCardComponent;
  let fixture: ComponentFixture<BookingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingCardComponent);
    component = fixture.componentInstance;
    
    // Le inyectamos data dummy al @Input antes de activar la primera detección de cambios
    component.booking = {
      id: 1,
      className: 'Yoga',
      instructor: 'Laura Gómez',
      schedule: 'Lunes 18:00',
      availableSpots: 10
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});