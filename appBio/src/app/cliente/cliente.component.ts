import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para el uso de directivas como *ngIf y *ngFor
import { ClienteService } from '../services/client.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ClienteComponent implements OnInit {
  clientes: any[] = [];  // Asegurarse de que clientes es un array
  loading = true;
  errorMessage: string = '';
  cliente: any;  // Almacena los datos del cliente actual, si solo uno

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();  // Llamar a la función para cargar los clientes
  }

  loadClientes(): void {
    this.clienteService.getClients().subscribe({
      next: (data: any[]) => {
        if (Array.isArray(data)) {
          this.clientes = data;  // Si es un array, asignamos a clientes
        } else {
          this.cliente = data;  // Si es un solo cliente, asignamos a cliente
        }
        this.loading = false;  // Dejamos de cargar
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar clientes.';
        console.error('Error al obtener clientes:', err);
        this.loading = false;  // Dejamos de cargar
      }
    });
  }

  selectClient(cliente: any): void {
    this.clienteService.seleccionarCliente(cliente);  // Función para manejar el cliente seleccionado
    console.log('Cliente seleccionado:', cliente);
  }
}
