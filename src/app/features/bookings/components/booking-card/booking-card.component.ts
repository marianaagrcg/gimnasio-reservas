import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Booking } from '../../../../core/models/booking.model';

@Component({
  selector: 'app-booking-card',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      <div class="card-info">
        <h3>{{ booking.className }}</h3>
        <p>Instructor: {{ booking.instructor }}</p>
      </div>
      <button (click)="onSelect.emit(booking)">Ver más</button>
    </div>
  `,
  styles: `
    .card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .card-info h3 {
      margin: 0 0 0.25rem 0;
      color: #333;
    }
    .card-info p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    button:hover {
      background-color: #0056b3;
    }
  `
})
export class BookingCardComponent {
  // Recibe la información de la clase desde el componente padre
  @Input({ required: true }) booking!: Booking;
  
  // Avisa al padre cuando el usuario da clic en "Ver más"
  @Output() onSelect = new EventEmitter<Booking>();
}