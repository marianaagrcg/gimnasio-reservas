import { Component } from '@angular/core';
import { BookingListComponent } from '../components/booking-list/booking-list.component';
import { BookingDetailComponent } from '../components/booking-detail/booking-detail.component';

@Component({
  selector: 'app-bookings-layout',
  standalone: true,
  imports: [BookingListComponent, BookingDetailComponent],
  template: `
    <div class="dashboard-grid">
      <section class="main-content">
        <app-booking-list />
      </section>

      <aside class="sidebar">
        <app-booking-detail />
      </aside>
    </div>
  `,
  styles: `
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Responsividad: Se activa el diseño de dos columnas en pantallas medianas/grandes */
    @media (min-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1.5fr 1fr;
        padding: 2rem;
      }
      
      .sidebar {
        position: sticky;
        top: 2rem;
        align-self: start;
      }
    }
  `
})
export class BookingsLayoutComponent {}