import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteComponent } from './cliente.component';
import { ClienteService } from '../services/client.service';
import { of, throwError } from 'rxjs';

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let fixture: ComponentFixture<ClienteComponent>;
  let clienteServiceSpy: jasmine.SpyObj<ClienteService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ClienteService', ['getClients', 'seleccionarCliente']);

    await TestBed.configureTestingModule({
      declarations: [ClienteComponent],
      providers: [{ provide: ClienteService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
    clienteServiceSpy = TestBed.inject(ClienteService) as jasmine.SpyObj<ClienteService>;
  });

  it('should load clients on initialization', () => {
    const mockClients = [{ nombre: 'Juan', dni: '12345678' }];
    clienteServiceSpy.getClients.and.returnValue(of(mockClients));

    component.ngOnInit();

    expect(component.cliente).toEqual(mockClients);
    expect(component.loading).toBeFalse();
  });

  it('should handle error during client load', () => {
    clienteServiceSpy.getClients.and.returnValue(throwError(() => new Error('Error')));

    component.ngOnInit();

    expect(component.errorMessage).toEqual('Error al cargar clientes.');
    expect(component.loading).toBeFalse();
  });

  it('should select a client', () => {
    const mockClient = { nombre: 'Juan', dni: '12345678' };
    clienteServiceSpy.seleccionarCliente.and.callFake(() => {});

    component.selectClient(mockClient);

    expect(clienteServiceSpy.seleccionarCliente).toHaveBeenCalledWith(mockClient);
  });
});
