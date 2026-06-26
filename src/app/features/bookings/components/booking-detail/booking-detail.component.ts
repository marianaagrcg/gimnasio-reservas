import { Component, inject } from '@angular/core';
import { BookingService } from '../../../../core/services/booking.service';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  template: `
    <div class="detail-container">
      @if (bookingService.selectedBooking(); as booking) {
        <div class="detail-card">
          <h3>Clase: {{ booking.className }}</h3>
          <p><strong>Profesor:</strong> {{ booking.instructor }}</p>
          <p><strong>Horario:</strong> {{ booking.schedule }}</p>
          <p><strong>Cupos:</strong> 
            <span [class.no-spots]="booking.availableSpots === 0">
              {{ booking.availableSpots > 0 ? booking.availableSpots + ' disponibles' : 'Agotado' }}
            </span>
          </p>
          
          <button 
            [disabled]="booking.availableSpots === 0" 
            (click)="onReserve(booking.id)">
            {{ booking.availableSpots > 0 ? 'Reservar' : 'Sin Cupos' }}
          </button>
        </div>
      } @else {
        <div class="placeholder-card">
          <p>Selecciona una clase del listado para ver el detalle de la reserva.</p>
        </div>
      }
    </div>
  `,
  styles: `
    .detail-container {
      width: 100%;
    }
    .detail-card {
      border: 1px solid #e0e0e0;
      padding: 1.5rem;
      border-radius: 8px;
      background-color: #fafafa;
      box-shadow: 0 4px 6px rgba(0,0,0,0.02);
    }
    .detail-card h3 {
      margin-top: 0;
      color: #111;
      font-size: 1.3rem;
      border-bottom: 2px solid #007bff;
      padding-bottom: 0.5rem;
    }
    .detail-card p {
      margin: 0.8rem 0;
      color: #444;
    }
    .no-spots {
      color: #dc3545;
      font-weight: bold;
    }
    button {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
      font-size: 1rem;
      font-weight: bold;
      margin-top: 1rem;
      transition: background-color 0.2s;
    }
    button:hover:not(:disabled) {
      background-color: #218838;
    }
    button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
    .placeholder-card {
      border: 1px dashed #bbb;
      padding: 2rem;
      border-radius: 8px;
      background-color: #f8f9fa;
      text-align: center;
      color: #777;
      font-style: italic;
    }
  `
})
export class BookingDetailComponent {
  // Inyectamos el mismo servicio global para leer la señal selectora
  bookingService = inject(BookingService);

  // Ejecuta la acción simulada de reserva
  onReserve(id: number): void {
    this.bookingService.reserveSpot(id);
    alert('¡Cupo reservado con éxito (Simulación local)!');
  }
}