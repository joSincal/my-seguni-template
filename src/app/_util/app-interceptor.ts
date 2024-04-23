import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '@services/alert.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  iniciadas = 0;
  finalizadas = 0;

  constructor(
    private _alertService: AlertService,
    private _cookieService: CookieService,
    private _spinnerService: NgxSpinnerService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.getSessionId();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken),
    });
    this._spinnerService.show();
    this.iniciadas++;
    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err.status === 401) {
          window.location.href = environment.urlLogin;
        }
        let msgError = '';
        let severity = 'warn';
        if (err.error.msg) {
          msgError = err.error.msg;
        } else {
          msgError = err.message;
          severity = 'error';
        }
        this._alertService.showMessage(
          msgError,
          err.status,
          severity as 'warn' | 'error'
        );

        return throwError(() => err);
      }),
      finalize(() => {
        this.finalizadas++;
        if (this.iniciadas == this.finalizadas) {
          this.iniciadas = 0;
          this.finalizadas = 0;
          this._spinnerService.hide();
        }
      })
    );
  }

  getSessionId() {
    const value: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqZ3VpdHpvbEB1bml2ZXJzYWxlcy5jb20iLCJ1c2VySWQiOjc0OTczLCJvcmlnaW4iOiJ3ZWIiLCJleHAiOjE3MDk4MzMyMTl9.6yWsxM5KCG-AS2l54z9bG0D1ArwkSoMzrDF8QOYS0PTexmySKj4aq8C2nTbb6YP-bfCOL0U3ROqCUATwnO5aZQ'//this._cookieService.get('SESSIONID');
    if (!value) {
      window.location.href = environment.urlLogin;
    }
    return 'Bearer ' + value;
  }
}
