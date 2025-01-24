import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FacturaComponent } from './factura.component';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [CommonModule], // Importa CommonModule aquí también
    declarations: [FacturaComponent],
  }).compileComponents();
});
