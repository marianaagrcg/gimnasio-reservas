# Sistema de Reservas de Turnos - Gimnasio 🏋️

Aplicación web responsiva para gestionar la visualización y reserva de clases de un gimnasio en tiempo real.

## 🚀 1. Instrucciones de Instalación y Ejecución

Sigue estos pasos para clonar y ejecutar el entorno de desarrollo local:

1. **Instalar dependencias del proyecto**:
   ```bash
   npm install
   ```

2. **Levantar el servidor local con ng serve**:

   ```bash
   npm start
   ```

   Una vez iniciado, abre en tu navegador la dirección: [http://localhost:4200/](http://localhost:4200/).

3. **Ejecutar pruebas unitarias (Vitest)**:

   ```bash
   npm test
   ```

## 🛠️ 2. Versiones Utilizadas

- **Node.js**: v25.9.0
- **Angular CLI & Build Tools**: v21.2.17
- **Angular Core**: v21.2.0
- **TypeScript**: v5.9.2
- **Test Runner**: Vitest v4.0.8

## 🏛️ 3. Arquitectura de Componentes y Estrategia de Comunicación

### Estructura de Componentes

La aplicación se organiza por responsabilidades limpias en carpetas (`core/` globales y `features/` del negocio):

- **AppComponent**: Layout principal y contenedor de la aplicación.
- **BookingsLayoutComponent**: Distribución responsiva en rejilla con CSS Grid nativo.
- **BookingListComponent**: Renderiza la lista de clases y maneja los estados visuales (*Loading*, *Error*, *Empty State*).
- **BookingCardComponent**: Tarjeta individual atómica que recibe la data mediante `@Input()` y notifica clics mediante `@Output()`.
- **BookingDetailComponent**: Panel que muestra los detalles del turno seleccionado y aloja la acción de reservar.

### Estrategia de Comunicación Elegida

La comunicación entre `BookingListComponent` y `BookingDetailComponent` se resuelve mediante un **servicio compartido (`BookingService`)**.

- **Justificación**: `BookingListComponent` selecciona una clase y la guarda en el servicio, mientras que `BookingDetailComponent` lee ese mismo estado para renderizar el detalle. Aunque la rúbrica permite `Subject` / `BehaviorSubject`, en esta implementación se usa **Angular Signals** como estado reactivo centralizado, evitando suscripciones manuales y manteniendo ambos componentes desacoplados.

## 🌐 4. Simulación de la API

La aplicación simula el consumo asíncrono de un endpoint REST real utilizando el cliente nativo `HttpClient`:

- El servicio intenta consultar el endpoint ficticio `GET https://api.gimnasio.local/bookings`.
- Mediante un pipe con los operadores `delay(1000)` y `catchError` de RxJS, se intercepta la caída programada de la URL para inyectar una colección inmutable de datos mockeados tras un segundo de latencia.
- Esto permite emular de manera fidedigna los tiempos de respuesta y validar el comportamiento de los estados de carga de la UI.


🔗 **Link del Deploy**: [https://marianaagrcg.github.io/gimnasio-reservas/](https://marianaagrcg.github.io/gimnasio-reservas/)