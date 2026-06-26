import { Component, OnInit, inject } from '@angular/core';
import { BookingService } from '../../../../core/services/booking.service';
import { BookingCardComponent } from '../booking-card/booking-card.component';
import { Booking } from '../../../../core/models/booking.model';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [BookingCardComponent],
  template: `
    <div class="list-container">
      <h2>🏋️ Reservas disponibles</h2>

      @if (bookingService.loading()) {
        <div class="loading-state">
          <p>Buscando clases disponibles...</p>
        </div>
      } 
      
      @else if (bookingService.error()) {
        <div class="error-state">
          <p>Hubo un problema al cargar los turnos. Reintenta más tarde.</p>
        </div>
      } 
      
      @else {
        <div class="list-grid">
          @for (item of bookingService.bookings(); track item.id) {
            <app-booking-card 
              [booking]="item" 
              (onSelect)="onSelectClass(item)" 
            />
          } @empty {
            <div class="empty-state">
              <p>No hay clases disponibles en este momento.</p>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: `
    .list-container {
      width: 100%;
    }
    .list-container h2 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: #222;
      font-size: 1.4rem;
    }
    .list-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .loading-state, .error-state, .empty-state {
      text-align: center;
      padding: 2rem;
      background-color: #f8f9fa;
      border-radius: 8px;
      border: 1px dashed #ccc;
      color: #666;
    }
    .error-state {
      background-color: #fff5f5;
      border-color: #feb2b2;
      color: #c53030;
    }
  `
})
export class BookingListComponent implements OnInit {
  // Inyectamos el servicio global del estado
  bookingService = inject(BookingService);

  ngOnInit(): void {
    // Al arrancar, disparamos la petición simulada
    this.bookingService.fetchBookings();
  }

  // Cuando el usuario elige una tarjeta, la guardamos en el estado global
  onSelectClass(booking: Booking): void {
    this.bookingService.selectBooking(booking);
  }
}