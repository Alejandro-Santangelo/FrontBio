import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:5068/UsuarioAdministrador/Cliente'; // URL del backend
  private selectedClient: any;

  constructor(private http: HttpClient) {}

  // Obtener todos los clientes
  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Obtener cliente actual por su DNI
  getClientByDni(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mi-dni`);
  }

  // Seleccionar un cliente
  seleccionarCliente(cliente: any): void {
    this.selectedClient.next(cliente);
  }

  // Obtener cliente seleccionado
  getClienteSeleccionado(): Observable<any> {
    return this.selectedClient.asObservable();
  }
}
