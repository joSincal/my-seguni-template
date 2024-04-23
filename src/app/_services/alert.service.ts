import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type Severity = 'success' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  /**
   * Constructor
   */
  constructor(private _messageService: MessageService) {}

  //---------------------------------------------------------------
  // P U B L I C    M E T H O D S
  //---------------------------------------------------------------

  /**
   * Show Message
   */
  public showMessage(
    msj: string,
    title?: string,
    type: Severity = 'success',
    lifeTime?: number
  ) {
    this._messageService.add({
      severity: type,
      summary: title,
      detail: msj,
      sticky: false,
      closable: true,
      life: lifeTime || 2500,
    });
  }
}
