import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { FacturaComponent } from '../factura/factura.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  standalone: true,
  imports: [CommonModule, FacturaComponent],  // Agrega CommonModule aquí
})
export class ClienteComponent implements OnInit {
  clientes: any[] = [];
  clienteSeleccionado: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.http.get<any[]>('http://localhost:5068/UsuarioAdministrador/Cliente')
      .subscribe(data => {
        this.clientes = data;
      }, error => {
        console.error('Error al cargar clientes:', error);
      });
  }

  seleccionarCliente(cliente: any) {
    this.clienteSeleccionado = cliente;
  }
}

