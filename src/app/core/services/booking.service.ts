import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay, catchError, tap } from 'rxjs/operators';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private http = inject(HttpClient);

  // Estado global de la feature usando Signals
  #bookings = signal<Booking[]>([]);
  #selectedBooking = signal<Booking | null>(null);
  #loading = signal<boolean>(false);
  #error = signal<string | null>(null);

  // Exponer las señales como read-only para los componentes
  bookings = computed(() => this.#bookings());
  selectedBooking = computed(() => this.#selectedBooking());
  loading = computed(() => this.#loading());
  error = computed(() => this.#error());

  // Data de prueba para simular la respuesta del backend
  private mockBookings: Booking[] = [
    { id: 1, className: 'Yoga', instructor: 'Laura Gómez', schedule: 'Lunes 18:00', availableSpots: 10 },
    { id: 2, className: 'Crossfit', instructor: 'Carlos Pérez', schedule: 'Martes 07:00', availableSpots: 0 },
    { id: 3, className: 'Spinning', instructor: 'Ana Martínez', schedule: 'Miércoles 19:30', availableSpots: 5 },
    { id: 4, className: 'Funcional', instructor: 'Luis Hernández', schedule: 'Jueves 18:30', availableSpots: 2 }
  ];

  // Cargar las clases simulando una petición HTTP asíncrona
  fetchBookings(): void {
    this.#loading.set(true);
    this.#error.set(null);

    this.http.get<Booking[]>('https://api.gimnasio.local/bookings').pipe(
      delay(1000), // Delay para probar el spinner / loading state de la UI
      catchError(() => {
        // Al no tener un backend real, atrapamos el 404 y resolvemos con los mocks
        return of(this.mockBookings);
      }),
      tap((data) => {
        this.#bookings.set(data);
        this.#loading.set(false);
      })
    ).subscribe();
  }

  // Guardar la clase que el usuario quiere revisar a detalle
  selectBooking(booking: Booking): void {
    this.#selectedBooking.set(booking);
  }

  // Restar un cupo localmente de forma reactiva e inmutable
  reserveSpot(id: number): void {
    this.#bookings.update(list =>
      list.map(b => b.id === id && b.availableSpots > 0 
        ? { ...b, availableSpots: b.availableSpots - 1 } 
        : b
      )
    );

    // Sincronizar el detalle actual con el nuevo número de cupos
    const updated = this.#bookings().find(b => b.id === id);
    if (updated) {
      this.#selectedBooking.set(updated);
    }
  }
}