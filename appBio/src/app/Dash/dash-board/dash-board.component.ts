import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { ClienteService } from '../../services/client.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FotoPerfilComponent } from '../../components/foto-perfil/foto-perfil.component';
import { CambiarCredencialesComponent } from '../../components/cambiar-credenciales/cambiar-credenciales.component';
import { MENU_ITEMS } from '../../config/menu-items.config';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule, FotoPerfilComponent],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit, OnDestroy {
  userRol: string | null = '';
  username: string | null = '';
  menuItems: any[] = [];
  clients: any[] = [];
  private isBrowser: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private clientService: ClienteService,
    private dialog: MatDialog,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    const userInfo = this.authService.getUserInfo();
    this.userRol = userInfo.rol || '';
    this.username = userInfo.username || '';

    this.updateMenuItems(this.userRol);

    if (this.userRol === 'Cliente') {
      this.loadClientData();
    } else {
      this.loadAllClients();
    }

    this.subscriptions.push(
      this.authService.userRole$.subscribe(rol => {
        this.userRol = rol;
        this.updateMenuItems(rol);
      })
    );

    this.subscriptions.push(
      this.authService.username$.subscribe(username => {
        this.username = username;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private updateMenuItems(userRol: string | null) {
    if (!userRol) {
      this.menuItems = [];
      return;
    }

    this.menuItems = MENU_ITEMS.filter(item => item.roles.includes(userRol));
  }

  private loadClientData() {
    this.clientService.getClientByDni().subscribe({
      next: data => this.clients = [data],
      error: err => console.error('Error loading client data:', err)
    });
  }

  private loadAllClients() {
    this.clientService.getClients().subscribe({
      next: data => this.clients = data,
      error: err => console.error('Error loading clients:', err)
    });
  }

  abrirModalCredenciales() {
    const dialogRef = this.dialog.open(CambiarCredencialesComponent, {
      width: '400px',
      disableClose: true
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe({
        next: result => {
          if (result) console.log('Credenciales actualizadas con éxito');
        },
        error: err => console.error('Error al cerrar el diálogo:', err)
      })
    );
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => {
        console.error('Error during logout:', err);
        this.router.navigate(['/login']);
      }
    });
  }
}
