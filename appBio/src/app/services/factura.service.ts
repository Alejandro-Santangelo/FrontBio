import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = 'http://localhost:5068/api/Factura'; // Asegúrate de que la URL sea la correcta para tu API

  constructor(private http: HttpClient) {}

  /**
   * Crear una nueva factura
   * @param factura Objeto con los datos de la factura a crear
   * @returns Observable de la respuesta del servidor
   */
  crearFactura(factura: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, factura);
  }

  /**
   * Obtener una factura por su ID
   * @param id ID de la factura
   * @returns Observable con los datos de la factura
   */
  obtenerFacturaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtener todas las facturas
   * @returns Observable con el listado de todas las facturas
   */
  obtenerTodasLasFacturas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
