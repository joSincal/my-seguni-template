import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

import { MatTooltipModule } from '@angular/material/tooltip';

import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    CommonModule,
    ConfirmPopupModule,
    MatTooltipModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  /**
   * Constructor
   */
  constructor(private confirmationService: ConfirmationService)
  {}

  //---------------------------------------------------------------------------------
  // P U B L I C    M E T H O D S
  //---------------------------------------------------------------------------------

  /**
   * Log Out
   */
  public logout(event: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿ Está seguro que desea salir ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        window.location.href = '/logout';
      },
    });
  }
}
