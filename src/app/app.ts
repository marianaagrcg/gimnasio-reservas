import { Component } from '@angular/core';
import { BookingsLayoutComponent } from './features/bookings/bookings-layout/bookings-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookingsLayoutComponent],
  template: `
    <main class="app-container">
      <header class="app-header">
        <h1>🏋️ FitGym - Panel de Reservas</h1>
      </header>
      
      <app-bookings-layout />
    </main>
  `,
  styles: `
    .app-container {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f4f6f9;
      min-height: 100vh;
      color: #333;
      margin: 0;
    }
    .app-header {
      background-color: #1a202c;
      color: white;
      padding: 1rem 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .app-header h1 {
      margin: 0;
      font-size: 1.5rem;
    }
  `
})
export class AppComponent {}