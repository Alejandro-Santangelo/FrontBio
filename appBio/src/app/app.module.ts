import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteDialogComponent } from './components/clientes/cliente-dialog/cliente-dialog.component';
import { ConfirmDialogComponent } from './components/clientes/confirm-dialog/confirm-dialog.component';
import { FacturaComponent } from './factura/factura.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  imports: [
    ClienteDialogComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    ConfirmDialogComponent,MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatTableModule,MatInputModule,FacturaComponent,ClientesComponent,MatDialogModule,FacturaComponent
   
  ],
  providers: [],
  bootstrap: [AppModule]
})
export class AppModule { }
