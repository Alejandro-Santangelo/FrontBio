import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent {
  facturaForm: FormGroup;
facturaSeleccionada: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.facturaForm = this.fb.group({
      consumoMensual: ['', Validators.required],
      consumoTotal: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      fechaVencimiento: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.facturaForm.valid) {
      const facturaData = this.facturaForm.value;
      const dniCliente = 12345678; // Este debe ser el DNI del cliente logueado

      // Llamada al backend para cargar la factura
      this.http.post(`http://localhost:5000/UsuarioAdministrador/Cliente/${dniCliente}/Facturas`, facturaData)
        .subscribe(response => {
          console.log('Factura cargada:', response);
          alert('Factura cargada exitosamente');
        }, error => {
          console.error('Error al cargar factura:', error);
          alert('Hubo un error al cargar la factura');
        });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}
