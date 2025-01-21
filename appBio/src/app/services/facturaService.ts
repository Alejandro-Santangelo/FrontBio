import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacturaDto } from '../models/factura.interface';
import { ClienteDto } from '../models/cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private apiUrl = 'http://localhost:5068/api/Factura';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<ClienteDto[]> {
    return this.http.get<ClienteDto[]>('http://localhost:5068/UsuarioAdministrador/Cliente');
  }

  getClienteDatosTotales(dni: number): Observable<ClienteDto> {
    return this.http.get<ClienteDto>(`http://localhost:5068/UsuarioAdministrador/Cliente/${dni}/datos-totales`);
  }

  getFacturasByDni(dni: number): Observable<FacturaDto[]> {
    return this.http.get<FacturaDto[]>(`http://localhost:5068/api/Factura/cliente/${dni}`);
  }

  // Crear una nueva factura
  crearFactura(nuevaFactura: FacturaDto): Observable<FacturaDto> {
      return this.http.post<FacturaDto>(`${this.apiUrl}`, nuevaFactura);
  }

  // Guardar una factura (también sirve para editarla, se usa PUT)
  guardarFactura(factura: FacturaDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${factura.numeroFactura}`, factura);
  }

  // Eliminar factura
  eliminarFactura(numeroFactura: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${numeroFactura}`);
  }

  // Actualizar una factura
  actualizarFactura(factura: FacturaDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${factura.numeroFactura}`, factura);
  }

  obtenerFacturas(dni: number): Observable<FacturaDto[]> {
    return this.http.get<FacturaDto[]>(`${this.apiUrl}/cliente/${dni}`);
  }
}
