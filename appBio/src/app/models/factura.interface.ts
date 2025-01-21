export interface FacturaDto {
    
    numeroFactura:number;
    fechaEmision: Date;
    fechaVencimiento: Date;
    consumoMensual: number;
    consumoTotal: number;
    numeroCliente: number;
    numeroMedidor: number;
}