import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://5068/api'; // Reemplaza con tu URL base

  constructor(private http: HttpClient) {}

  obtenerClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clientes`);
  }

  obtenerClientePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clientes/${id}`);
  }

  crearFactura(factura: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/facturas`, factura);
  }
}
